// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ownable.sol";

contract CryptoDevsDAO is IERC721Receiver {
    uint DAOmembers;

    constructor() {
        owner = msg.sender; // setting the owner the contract deployer
        DAOmembers = 0;
    }

    enum proposalStatus {
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
        uint proposalID;
        address proposed;
        uint256 deadline;
        uint256 votesFor;
        uint256 votesAgainst;
        ProposalType proposalType;
        bool executed;
        uint voterNumber;
        mapping(address => bool) voters;
    }
    
    // Map Proposal ID to Proposal
    mapping(uint256 => Proposal) public proposals;
    mapping(address => bool) public memberAddresses;

    event newUserProposed(address userProposed);
    event newLicenseProposed(address licenseProposed);
    event userJoined(address newUserAddress);
    event userRejected(address rejectedUserAddress);
    event newLicenseValidated(address newLicenseAddress);
    event LicenseRejected(address rejectedLicenseAddress);

    memberAddresses[owner] = true;

    uint256 public numProposals;

    modifier memberOnly() {
        require(members[msg.sender].lockedUpNFTs.length > 0, "NOT_A_MEMBER");
        _;
    }

    function newProposal(address _proposed, ProposalType _proposalType) external memberOnly returns (uint256){
        if (_proposalType == ProposalType.MEMBER) {
            require(memberAddresses[_proposed] == 0, "USER IS ALREADY IN THE DAO");
            proposals.proposalID = proposalIDGeneral
            proposals.proposed = _proposed;
            proposals.deadline = now + 7 days;
            proposals.proposalType = MEMBER;
            emit newUserProposed(_proposed);
        } else if (_proposalType == ProposalType.LICENSE) {
            proposals.proposalID = proposalIDGeneral
            proposals.proposed = _proposed;
            proposals.deadline = now + 7 days;
            proposals.proposalType = LICENSE;
            emit newLicenseProposed(_proposed);
        }
        ///this block updates proposal number of the contract and returns current proposal to front
        Proposal storage proposal = proposals[numProposals];
        numProposals++;
        return numProposals - 1;
    }


    // Vote yes/no on a given proposal
    function voteOnProposal(uint256 _proposalId, VoteType _vote) external memberOnly {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.deadline > block.timestamp, "INACTIVE_PROPOSAL");
        require(proposal.voters[msg.sender] == false, "ALREADY_VOTED");

        proposal.voters[msg.sender] = true;
        proposal.voterNumber += 1;

        if (_vote == VoteType.voteFor) {
            proposal.voteFor += 1;
        } else {
            proposal.voteAgainst += 1;
        }
    }


    // Execute a proposal
    function executeProposal(uint256 _proposalId) external memberOnly {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.deadline <= block.timestamp, "ACTIVE_PROPOSAL");
        require(proposal.executed == false, "ALREADY_EXECUTED");
        require(proposal.voterNumber == DAOmembers*0.30);
        proposal.executed = true;

        if (proposal.voteFor > (proposal.voterNumber/2)) {
            if (proposal.proposalType == ProposalType.MEMBER) {
                addUser(proposal.address);
            } else {
                addLicense(proposal.address);
            }
        }
    }

    function isUser() public returns (bool) {
        bool isInDao;
        if (memberAddresses[msg.sender] == 0) {
            isInDao = 1;
        } else {
            isInDao = 0;
        }
        return isInDao;
    }

    function addUser(address newUserAddress) public {
        memberAddresses[_addressToMemberlist] = true;
        DAOmembers += 1;
        emit userJoined(newUserAddress);
    }

    function addLicense(address newLicense) public {

    // function to quit the DAO
    function quit() external memberOnly {
        Member storage member = members[msg.sender];
        require(block.timestamp - member.joinedAt > 5 minutes, "MIN_MEMBERSHIP_PERIOD" );
        delete members[msg.sender];
    }
}
