// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract EventManager {
    
    struct Event {
        string name;
        string description;
        uint256 capacity;
        uint256 ticketsSold;
        uint256 ticketPrice; // in USD
        uint256 eventDate;
        string[] images; // array of image URLs
        uint256[] tickets;
        address eventHost;
    }

    struct Ticket {
        address holder;
        uint256 boughtTime;
        uint256 eventId;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;

    mapping(uint256 => mapping(address => bool)) ticketAllowance;

    mapping(address => uint256[]) public userTickets;

    uint256 public eventCounter;
    uint256 public ticketCounter;

    function getTicketPrice() public view returns (uint256) {
        // TODO: to be implemented
    }

    function createEvent(string memory _name, string memory _description, uint256 _capacity, uint256 _ticketPrice, uint256 _eventDate, string[] memory _images) public {
        events[eventCounter] = Event(_name, _description, _capacity, 0, _ticketPrice, _eventDate, _images, new uint256[](0), msg.sender);
        eventCounter++;
    }

    function getEventImages(uint256 _eventId) public view returns (string[] memory) {
        return events[_eventId].images;
    }

    function getEventTickets(uint256 _eventId) public view returns (uint256[] memory) {
        return events[_eventId].tickets;
    }

    //TODO: ADD CURRENCY CONVERSION + CHECK
    function buyTicket(uint256 _eventId) public payable {
        require(_eventId < eventCounter, "Invalid event ID");
        require(events[_eventId].eventDate > block.timestamp, "Event has already passed");
        require(events[_eventId].tickets.length < events[_eventId].capacity, "Event is full");
        require(msg.value == events[_eventId].ticketPrice, "Invalid ticket price");

        // Create new ticket
        tickets[ticketCounter] = Ticket(msg.sender, block.timestamp, _eventId);

        // Add ticket to user
        userTickets[msg.sender].push(ticketCounter);

        ticketCounter++;

        // Update number of tickets sold
        events[_eventId].ticketsSold++;

        // Transfer FLR to event host
        (bool sent, ) = events[_eventId].eventHost.call{value: msg.value}("");
        require(sent, "Failed to send FLR to event host");
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
        for (; i < userTickets[prevHolder].length; i++) {
            userTickets[prevHolder][i] = userTickets[prevHolder][i+1];
        }

        // Add ticket to _to's array
        userTickets[_to].push(_ticketId);

        tickets[_ticketId].holder = _to;
    }

    function approveTicket(uint256 _ticketId, address _to, bool _allowed) public {
        require(_ticketId < ticketCounter, "Invalid ticket ID");
        require(tickets[_ticketId].holder == msg.sender, "You do not own this ticket");
        ticketAllowance[_ticketId][_to] = _allowed;
    }

    function transferTicket(uint256 _ticketId, address _to) public {
        require(_ticketId < ticketCounter, "Invalid ticket ID");
        require(tickets[_ticketId].holder == msg.sender || tickets[_ticketId].holder == msg.sender, "You do not own this ticket");
        require(ticketAllowance[_ticketId][msg.sender], "You are not allowed to transfer this ticket");
        ticketAllowance[_ticketId][msg.sender] = false;
        transferTicketForce(_ticketId, _to);
    }

}