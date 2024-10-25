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
        address[] participants;
        address eventHost;
    }

    mapping(uint256 => Event) public events;
    mapping(address => Event) public userEvents;
    uint256 public eventCounter;

    function createEvent(string memory _name, string memory _description, uint256 _capacity, uint256 _ticketPrice, uint256 _eventDate, string[] memory _images) public {
        events[eventCounter] = Event(_name, _description, _capacity, 0, _ticketPrice, _eventDate, _images, new address[](0), msg.sender);
        eventCounter++;
    }

    function getEventImages(uint256 eventId) public view returns (string[] memory) {
        return events[eventId].images;
    }

    function getEventPartipicants(uint256 eventId) public view returns (address[] memory) {
        return events[eventId].participants;
    }

    //TODO: ADD CURRENCY CONVERSION + CHECK
    function buyTicket(uint256 eventId) public payable {
        require(eventId < eventCounter, "Invalid event ID");
        require(events[eventId].eventDate > block.timestamp, "Event has already passed");
        require(events[eventId].participants.length < events[eventId].capacity, "Event is full");
        require(msg.value == events[eventId].ticketPrice, "Invalid ticket price");
        events[eventId].participants.push(msg.sender);
        events[eventId].ticketsSold++;

        // Transfer FLR to event host
        (bool sent, ) = events[eventId].eventHost.call{value: msg.value}("");
        require(sent, "Failed to send FLR to event host");
    }

}