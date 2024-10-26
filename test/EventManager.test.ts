import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { EventManager } from "../typechain-types/EventManager";

describe("EventManager", function () {
  let eventManager: EventManager;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  const EVENT_NAME = "Test Event";
  const EVENT_DESCRIPTION = "This is a test event";
  const EVENT_CAPACITY = 100;
  const EVENT_TICKET_PRICE = 1000; // 10 USD in cents
  const EVENT_DATE = Math.floor(Date.now() / 1000) + 86400; // 1 day from now
  const EVENT_IMAGES = ["image1.jpg", "image2.jpg"];

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const EventManager = await ethers.getContractFactory("EventManager");
    eventManager = await EventManager.deploy();
    await eventManager.deployed();
  });

  async function createTestEvent() {
    await eventManager.createEvent(
      EVENT_NAME,
      EVENT_DESCRIPTION,
      EVENT_CAPACITY,
      EVENT_TICKET_PRICE,
      EVENT_DATE,
      EVENT_IMAGES
    );
  }

  describe("Event Creation", function () {
    it("Should create an event with correct details", async function () {
      await createTestEvent();

      const event = await eventManager.events(0);
      expect(event.name).to.equal(EVENT_NAME);
      expect(event.description).to.equal(EVENT_DESCRIPTION);
      expect(event.capacity).to.equal(EVENT_CAPACITY);
      expect(event.ticketPrice).to.equal(EVENT_TICKET_PRICE);
      expect(event.eventDate).to.equal(EVENT_DATE);
      expect(event.eventHost).to.equal(owner.address);
    });

    it("Should emit EventCreated event", async function () {
      await expect(await createTestEvent())
        .to.emit(eventManager, "EventCreated")
        .withArgs(0, EVENT_NAME, EVENT_DATE);
    });
  });

  describe("Ticket Purchase", function () {
    beforeEach(async function () {
      await createTestEvent();
    });

    it("Should allow buying a ticket", async function () {
      const ticketPriceFlare = await eventManager.getEventPriceFlare(0);
      await expect(eventManager.connect(addr1).buyTicket(0, { value: ticketPriceFlare }))
        .to.emit(eventManager, "TicketPurchased")
        .withArgs(0, 0, addr1.address, ticketPriceFlare);

      const ticket = await eventManager.tickets(0);
      expect(ticket.holder).to.equal(addr1.address);
      expect(ticket.eventId).to.equal(0);
    });

    it("Should fail if insufficient funds are provided", async function () {
      const ticketPriceFlare = await eventManager.getEventPriceFlare(0);
      await expect(
        eventManager.connect(addr1).buyTicket(0, { value: ticketPriceFlare.sub(1) })
      ).to.be.revertedWith("Insufficient value provided");
    });
  });

  describe("Ticket Transfer", function () {
    beforeEach(async function () {
      await createTestEvent();
      const ticketPriceFlare = await eventManager.getEventPriceFlare(0);
      await eventManager.connect(addr1).buyTicket(0, { value: ticketPriceFlare });
    });

    it("Should allow transferring a ticket", async function () {
      await expect(eventManager.connect(addr1).transferTicket(0, addr2.address))
        .to.emit(eventManager, "TicketTransferred")
        .withArgs(0, addr1.address, addr2.address);

      const ticket = await eventManager.tickets(0);
      expect(ticket.holder).to.equal(addr2.address);
    });

    it("Should fail if non-owner tries to transfer", async function () {
      await expect(
        eventManager.connect(addr2).transferTicket(0, addr2.address)
      ).to.be.revertedWith("You do not own this ticket");
    });
  });

  describe("Ticket Approval and Transfer", function () {
    beforeEach(async function () {
      await createTestEvent();
      const ticketPriceFlare = await eventManager.getEventPriceFlare(0);
      await eventManager.connect(addr1).buyTicket(0, { value: ticketPriceFlare });
    });

    it("Should allow approving and transferring a ticket", async function () {
      await expect(eventManager.connect(addr1).approveTicket(0, addr2.address, true))
        .to.emit(eventManager, "TicketTransferApproved")
        .withArgs(0, addr1.address, addr2.address);

      await expect(eventManager.connect(addr2).transferTicketFrom(0, addr2.address))
        .to.emit(eventManager, "TicketTransferred")
        .withArgs(0, addr1.address, addr2.address);

      const ticket = await eventManager.tickets(0);
      expect(ticket.holder).to.equal(addr2.address);
    });

    it("Should fail if transferring without approval", async function () {
      await expect(
        eventManager.connect(addr2).transferTicketFrom(0, addr2.address)
      ).to.be.revertedWith("You are not allowed to transfer this ticket");
    });
  });
});