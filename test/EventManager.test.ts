import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("EventManager", function () {
  let eventManager: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const EventManager = await ethers.getContractFactory("EventManager");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new EventManager contract before each test
    eventManager = await EventManager.deploy();
    await eventManager.deployed();
  });

  describe("Event Creation", function () {
    it("Should create a new event", async function () {
      const eventDate = Math.floor(Date.now() / 1000) + 86400; // 1 day from now
      await eventManager.createEvent(
        "Test Event",
        "A test event description",
        100,
        ethers.utils.parseEther("0.1"),
        eventDate,
        ["image1.jpg", "image2.jpg"]
      );

      const event = await eventManager.events(0);
      expect(event.name).to.equal("Test Event");
      expect(event.description).to.equal("A test event description");
      expect(event.capacity).to.equal(100);
      expect(event.ticketPrice).to.equal(ethers.utils.parseEther("0.1"));
      expect(event.eventDate).to.equal(eventDate);
      expect(event.eventHost).to.equal(owner.address);
    });

    it("Should return correct event images", async function () {
      await eventManager.createEvent(
        "Test Event",
        "A test event description",
        100,
        ethers.utils.parseEther("0.1"),
        Math.floor(Date.now() / 1000) + 86400,
        ["image1.jpg", "image2.jpg"]
      );

      const images = await eventManager.getEventImages(0);
      expect(images).to.deep.equal(["image1.jpg", "image2.jpg"]);
    });
  });

  describe("Ticket Purchase", function () {
    beforeEach(async function () {
      await eventManager.createEvent(
        "Test Event",
        "A test event description",
        100,
        ethers.utils.parseEther("0.1"),
        Math.floor(Date.now() / 1000) + 86400,
        ["image1.jpg"]
      );
    });

    it("Should allow buying a ticket", async function () {
      await eventManager.connect(addr1).buyTicket(0, {
        value: ethers.utils.parseEther("0.1"),
      });

      const event = await eventManager.events(0);
      expect(event.ticketsSold).to.equal(1);

      const userTickets = await eventManager.userTickets(addr1.address);
      expect(userTickets.length).to.equal(1);
    });

    it("Should not allow buying a ticket with incorrect price", async function () {
      await expect(
        eventManager.connect(addr1).buyTicket(0, {
          value: ethers.utils.parseEther("0.05"),
        })
      ).to.be.revertedWith("Invalid ticket price");
    });

    it("Should not allow buying a ticket for a past event", async function () {
      const pastEventDate = Math.floor(Date.now() / 1000) - 86400; // 1 day ago
      await eventManager.createEvent(
        "Past Event",
        "A past event",
        100,
        ethers.utils.parseEther("0.1"),
        pastEventDate,
        ["image1.jpg"]
      );

      await expect(
        eventManager.connect(addr1).buyTicket(1, {
          value: ethers.utils.parseEther("0.1"),
        })
      ).to.be.revertedWith("Event has already passed");
    });

    it("Should not allow buying a ticket for a full event", async function () {
      await eventManager.createEvent(
        "Small Event",
        "A small event",
        1,
        ethers.utils.parseEther("0.1"),
        Math.floor(Date.now() / 1000) + 86400,
        ["image1.jpg"]
      );

      await eventManager.connect(addr1).buyTicket(1, {
        value: ethers.utils.parseEther("0.1"),
      });

      await expect(
        eventManager.connect(addr2).buyTicket(1, {
          value: ethers.utils.parseEther("0.1"),
        })
      ).to.be.revertedWith("Event is full");
    });
  });

  describe("Ticket Transfer", function () {
    beforeEach(async function () {
      await eventManager.createEvent(
        "Test Event",
        "A test event description",
        100,
        ethers.utils.parseEther("0.1"),
        Math.floor(Date.now() / 1000) + 86400,
        ["image1.jpg"]
      );
      await eventManager.connect(addr1).buyTicket(0, {
        value: ethers.utils.parseEther("0.1"),
      });
    });

    it("Should allow approving ticket transfer", async function () {
      await eventManager.connect(addr1).approveTicket(0, addr2.address, true);
      const isApproved = await eventManager.ticketAllowance(0, addr2.address);
      expect(isApproved).to.be.true;
    });

    it("Should allow transferring an approved ticket", async function () {
      await eventManager.connect(addr1).approveTicket(0, addr2.address, true);
      await eventManager.connect(addr2).transferTicket(0, addr2.address);

      const ticket = await eventManager.tickets(0);
      expect(ticket.holder).to.equal(addr2.address);
    });

    it("Should not allow transferring an unapproved ticket", async function () {
      await expect(
        eventManager.connect(addr2).transferTicket(0, addr2.address)
      ).to.be.revertedWith("You are not allowed to transfer this ticket");
    });

    it("Should not allow transferring a ticket you don't own", async function () {
      await expect(
        eventManager.connect(addr2).transferTicket(0, addr2.address)
      ).to.be.revertedWith("You do not own this ticket");
    });
  });

  describe("Utility Functions", function () {
    it("Should convert cents to Flare correctly", async function () {
      const flareAmount = await eventManager.centsToFlare(100);
      expect(flareAmount).to.equal(140);
    });

    it("Should calculate power correctly", async function () {
      const result = await eventManager.power(2, 3);
      expect(result).to.equal(8);
    });

    it("Should get event price in Flare", async function () {
      await eventManager.createEvent(
        "Test Event",
        "A test event description",
        100,
        1000, // 10 USD
        Math.floor(Date.now() / 1000) + 86400,
        ["image1.jpg"]
      );

      const flarePrice = await eventManager.getEventPriceFlare(0);
      expect(flarePrice).to.equal(1400); // 14 FLR
    });

    it("Should not allow negative exponents in power function", async function () {
      await expect(eventManager.power(2, -1)).to.be.revertedWith("Exponent must be non-negative");
    });
  });

  describe("Event Queries", function () {
    beforeEach(async function () {
      await eventManager.createEvent(
        "Test Event",
        "A test event description",
        100,
        ethers.utils.parseEther("0.1"),
        Math.floor(Date.now() / 1000) + 86400,
        ["image1.jpg", "image2.jpg"]
      );
    });

    it("Should return correct event tickets", async function () {
      await eventManager.connect(addr1).buyTicket(0, {
        value: ethers.utils.parseEther("0.1"),
      });

      const tickets = await eventManager.getEventTickets(0);
      expect(tickets.length).to.equal(1);
      expect(tickets[0]).to.equal(0);
    });

    it("Should not allow querying non-existent events", async function () {
      await expect(eventManager.getEventImages(1)).to.be.revertedWith("Invalid event ID");
      await expect(eventManager.getEventTickets(1)).to.be.revertedWith("Invalid event ID");
      await expect(eventManager.getEventPriceFlare(1)).to.be.revertedWith("Invalid event ID");
    });
  });
});