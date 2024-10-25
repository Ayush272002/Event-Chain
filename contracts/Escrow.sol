// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


contract Escrow {
    
    struct EscrowContract {
        address buyer;
        address seller;
        uint256 amount;
        bool buyerApproved;
        bool sellerApproved;
        bool isComplete;
    }
    
    mapping(uint256 => EscrowContract) public escrows;
    uint256 public escrowCounter;
    
    function createEscrow(address _seller) public payable {
        escrows[escrowCounter] = EscrowContract(msg.sender, _seller, msg.value, false, false, false);
        escrowCounter++;
    }
    
    function approveEscrow(uint256 escrowId) public {
        require(escrowId < escrowCounter, "Invalid escrow ID");
        require(msg.sender == escrows[escrowId].buyer || msg.sender == escrows[escrowId].seller, "Unauthorized");
        
        if (msg.sender == escrows[escrowId].buyer) {
            escrows[escrowId].buyerApproved = true;
        } else {
            escrows[escrowId].sellerApproved = true;
        }
        
        if (escrows[escrowId].buyerApproved && escrows[escrowId].sellerApproved) {
            escrows[escrowId].isComplete = true;
            (bool sent, ) = escrows[escrowId].seller.call{value: escrows[escrowId].amount}("");
            require(sent, "Failed to send FLR to seller");
        }
    }
    
    function getEscrowAmount(uint256 escrowId) public view returns (uint256) {
        return escrows[escrowId].amount;
    }
    
    function getEscrowBuyer(uint256 escrowId) public view returns (address) {
        return escrows[escrowId].buyer;
    }
    
    function getEscrowSeller(uint256 escrowId) public view returns (address) {
        return escrows[escrowId].seller;
    }
    
    function getEscrowBuyerApproved(uint256 escrowId) public view returns (bool) {
        return escrows[escrowId].buyerApproved;
    }
    
    function getEscrowSellerApproved(uint256 escrowId) public view returns (bool) {
        return escrows[escrowId].sellerApproved;
    }
    
    function getEscrowIsComplete(uint256 escrowId) public view returns (bool) {
        return escrows[escrowId].isComplete;
    }

}