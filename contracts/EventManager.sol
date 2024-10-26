// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
/* THIS IS A TEST IMPORT, in production use: import {FtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/FtsoV2Interface.sol"; */
import {TestFtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/TestFtsoV2Interface.sol";

contract EventManager {
    
    TestFtsoV2Interface internal ftsoV2;
    bytes21[] public feedIds = [
        bytes21(0x01464c522f55534400000000000000000000000000) // FLR/USD
        // bytes21(0x014254432f55534400000000000000000000000000), // BTC/USD
        // bytes21(0x014554482f55534400000000000000000000000000) // ETH/USD
    ];

    constructor() {
        /* THIS IS A TEST METHOD, in production use: ftsoV2 = ContractRegistry.getFtsoV2(); */
        ftsoV2 = ContractRegistry.getTestFtsoV2();
    }

    struct Event {
        string name;
        string description;
        uint256 capacity;
        uint256 ticketsSold;
        uint256 ticketPrice; // in USD cents
        uint256 eventDate;
        string[] images; // array of image URLs
        uint256[] tickets;
        address payable eventHost;
    }

    struct Ticket {
        address holder;
        uint256 boughtTime;
        uint256 eventId;
    }

    event EventCreated(uint256 eventId, string name, uint256 eventDate);
    event TicketPurchased(uint256 ticketId, uint256 eventId, address buyer, uint256 price);
    event TicketTransferred(uint256 ticketId, address from, address to);
    event TicketTransferApproved(uint256 ticketId, address owner, address trustee);

    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;

    mapping(uint256 => mapping(address => bool)) ticketAllowance;

    mapping(address => uint256[]) public userTickets;

    uint256 public eventCounter;
    uint256 public ticketCounter;

    function getFtsoV2CurrentFeedValues() public view returns (
        uint256[] memory _feedValues,
        int8[] memory _decimals,
        uint64 _timestamp
    ) {
        return ftsoV2.getFeedsById(feedIds);
    }

    function getFlareFeed() public view returns (uint256 _feedValue, int8 _decimals, uint64 _timestamp) {
        uint256[] memory feedValues;
        int8[] memory decimals;
        uint64 timestamp;
        (feedValues, decimals, timestamp) = ftsoV2.getFeedsById(feedIds);
        return (feedValues[0], decimals[0], timestamp);
    }

    function centsToFlare(uint256 _cents) public view returns (uint256 _flr) {
        uint256 feedValue;
        int8 decimals;
        (feedValue, decimals, ) = getFlareFeed();
        return _cents * power(10, decimals) * 1 ether / 100 / feedValue;
    }

    function power(uint base, int8 exponent) private pure returns (uint) {
        require(exponent >= 0, "Exponent must be non-negative");
        uint result = 1;
        for (int8 i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }

    function getEventPriceFlare(uint256 _eventId) public view returns (uint256 _flr) {
        require(_eventId < eventCounter, "Invalid event ID");
        return centsToFlare(events[_eventId].ticketPrice);
    }

    function createEvent(string memory _name, string memory _description, uint256 _capacity, uint256 _ticketPrice, uint256 _eventDate, string[] memory _images) public returns (uint256 _eventId) {
        events[eventCounter] = Event(_name, _description, _capacity, 0, _ticketPrice, _eventDate, _images, new uint256[](0), payable(msg.sender));
        eventCounter++;
        emit EventCreated(eventCounter - 1, _name, _eventDate);
        return eventCounter - 1;
    }

    function getEventImages(uint256 _eventId) public view returns (string[] memory) {
        require(_eventId < eventCounter, "Invalid event ID");
        return events[_eventId].images;
    }

    function getEventTickets(uint256 _eventId) public view returns (uint256[] memory) {
        require(_eventId < eventCounter, "Invalid event ID");
        return events[_eventId].tickets;
    }

    function buyTicket(uint256 _eventId) public payable returns (uint256 _ticketId) {
        require(_eventId < eventCounter, "Invalid event ID");
        require(events[_eventId].eventDate > block.timestamp, "Event has already passed");
        require(events[_eventId].tickets.length < events[_eventId].capacity, "Event is full");

        uint256 ticketCost = getEventPriceFlare(_eventId); // Get ticket price in FLR
        require(msg.value >= ticketCost, "Insufficient value provided"); // Ensure user has paid >= ticket price
        if (msg.value > ticketCost) {
            // Pay any excess the user paid
            (bool sentExcess, ) = msg.sender.call{value: msg.value - ticketCost}("");
            require(sentExcess, "Failed to send FLR excess back to buyer");
        }

        // Create new ticket
        tickets[ticketCounter] = Ticket(msg.sender, block.timestamp, _eventId);

        // Add ticket to user
        userTickets[msg.sender].push(ticketCounter);

        ticketCounter++;

        // Update number of tickets sold
        events[_eventId].tickets.push(ticketCounter - 1);
        events[_eventId].ticketsSold++;

        // Transfer FLR to event host
        (bool sentToHost, ) = events[_eventId].eventHost.call{value: ticketCost}("");
        require(sentToHost, "Failed to send FLR to event host");

        emit TicketPurchased(ticketCounter - 1, _eventId, msg.sender, ticketCost);
        return ticketCounter - 1;
    }

    function transferTicketForce(uint256 _ticketId, address _to) private {
        require(_ticketId < ticketCounter, "Invalid ticket ID");
        require(events[tickets[_ticketId].eventId].eventDate > block.timestamp, "Event has already passed");

        address prevHolder = tickets[_ticketId].holder;

        // Get index of ticket in holder's array
        bool found = false;
        uint256 i = 0;
        for (; i < userTickets[prevHolder].length; i++) {
            if (userTickets[prevHolder][i] == _ticketId) {
                found = true;
                break;
            }
        }

        require(found, "Ticket not found in sender's inventory");

        // Remove ticket from holder's array
        for (; i < userTickets[prevHolder].length-1; i++) {
            userTickets[prevHolder][i] = userTickets[prevHolder][i+1];
        }
        userTickets[prevHolder].pop();

        // Add ticket to _to's array
        userTickets[_to].push(_ticketId);

        tickets[_ticketId].holder = _to;

        emit TicketTransferred(_ticketId, prevHolder, _to);
    }

    function approveTicket(uint256 _ticketId, address _to, bool _allowed) public {
        require(_ticketId < ticketCounter, "Invalid ticket ID");
        require(tickets[_ticketId].holder == msg.sender, "You do not own this ticket");
        ticketAllowance[_ticketId][_to] = _allowed;

        emit TicketTransferApproved(_ticketId, msg.sender, _to);
    }

    function transferTicketFrom(uint256 _ticketId, address _to) public {
        require(ticketAllowance[_ticketId][msg.sender], "You are not allowed to transfer this ticket");
        ticketAllowance[_ticketId][msg.sender] = false;
        transferTicketForce(_ticketId, _to);
    }

    function transferTicket(uint256 _ticketId, address _to) public {
        require(_ticketId < ticketCounter, "Invalid ticket ID");
        require(tickets[_ticketId].holder == msg.sender, "You do not own this ticket");
        transferTicketForce(_ticketId, _to);
    }

}
