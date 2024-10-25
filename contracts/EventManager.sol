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

}