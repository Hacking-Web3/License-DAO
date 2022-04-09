// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract licensedao {
    uint DAOmembers;

    constructor() {
        owner = msg.sender; // setting the owner the contract deployer
        DAOmembers = 0;
        members[owner] = true;
    }

    enum proposalStatus {
        NONE,
        ACCEPTED,
        REJECTED
    }

    enum voteType { 
        NONE,
        FOR,
        AGAINST
    }

    enum ProposalType {
        MEMBER,
        LICENSE
    }

    struct Proposal {
        address proposed;
        uint256 deadline;
        uint256 votesFor;
        uint256 votesAgainst;
        ProposalType proposalType;
        bool executed;
        proposalStatus status;
        mapping(address => bool) voters;
        mapping(address => voteType) _voteType;
    }
    
    // Map Proposal ID to Proposal
    mapping(uint256 => Proposal) public proposals;
    mapping(address => bool) public members;
    mapping(address => uint) public coverLetters;

    event NewUserProposed(address userProposed);
    event NewLicenseProposed(address licenseProposed);
    event UserJoined(address newUserAddress);
    event UserRejected(address rejectedUserAddress);
    event NewLicenseValidated(address newLicenseAddress);
    event LicenseRejected(address rejectedLicenseAddress);

    uint chorum = DAOmembers * 10000 / 3000;

    uint256 public numProposals;

    modifier memberOnly() {
        require(members[msg.sender] == 0, "You need to be a member");
        _;
    }

    function newProposal(address _proposed, ProposalType _proposalType) external memberOnly returns (uint256){
        Proposal storage proposal = proposals[numProposals];
        if (_proposalType == ProposalType.MEMBER) {
            require(members[_proposed] == 0, "USER IS ALREADY IN THE DAO");
            proposals[proposalType] = MEMBER;
            emit NewUserProposed(_proposed);
        } else if (_proposalType == ProposalType.LICENSE) {
            proposals[proposalType] = LICENSE;
            emit NewLicenseProposed(_proposed);
        }
        proposals[proposed] = _proposed;
        proposals[deadline] = now + 7 days;
        ///this block updates proposal number of the contract and returns current proposal to front
        numProposals++;
        return numProposals - 1;
    }

    /// Vote yes/no on a given proposal
    function voteOnProposal(uint256 _proposalId, voteType _vote) external memberOnly {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.deadline > block.timestamp, "INACTIVE_PROPOSAL");
        if (proposal.voters[msg.sender] == false) {
            if (proposal[msg.sender].voteType == FOR && _vote == voteType.AGAINST) {
                proposal.voteFor -= 1;
                proposal.voteAgainst += 1;
            } else if (proposal[msg.sender].voteType == AGAINST && _vote == voteType.FOR) {
                proposal.voteFor += 1;
                proposal.voteAgainst -= 1;
            }            
        } else {
            proposal.voters[msg.sender] = true;

            if (_vote == VoteType.voteFor) {
                proposal.voteFor += 1;
            } else {
                proposal.voteAgainst += 1;
            }
        }
    }

    /// Execute a proposal
    function executeProposal(uint256 _proposalId) external memberOnly {
        Proposal storage proposal = proposals[_proposalId];
        
        if (proposal.deadline <= block.timestamp && (proposal.votesFor + proposal.voteAgainst) < chorum) {
            proposal.status = REJECTED;
            revert();
        }

        require(proposal.deadline <= block.timestamp, "ACTIVE_PROPOSAL");
        require(proposal.executed == false, "ALREADY_EXECUTED");
        require((proposal.votesFor + proposal.voteAgainst) >= chorum);
        proposal.executed = true;

        if (proposal.voteFor > ((proposal.votesFor + proposal.votesAgainst)/2)) {
            if (proposal.proposalType == ProposalType.MEMBER) {
                addUser(proposal.address);
            } else {
                addLicense(proposal.address);
            }
            proposal.status = ACCEPTED;
        }
    }

    function addUser(address newUserAddress) internal {
        members[_addressToMemberlist] = true;
        DAOmembers += 1;
        emit UserJoined(newUserAddress);
    }

    function addLicense(address newLicense) internal {
        ///we need to decide what to do
    }
}
