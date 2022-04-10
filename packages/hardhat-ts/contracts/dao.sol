// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LicenseDAO {
  // Map Proposal ID to Proposal
  mapping(address => bool) public members;
  mapping(address => bool) public licenses;

  mapping(address => uint256) public coverLetters;

  // address is license contract or member
  mapping(address => Proposal) proposals;

  uint256 public totalMembers;
  uint256 public quorum;
  uint256 public support;
  uint256 public numProposals;
  uint256 public proposalDuration = 7 days;

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
    uint256 deadline;
    uint256 votesFor;
    uint256 votesAgainst;
    ProposalType proposalType;
    mapping(address => voteType) votes;
  }

  event NewUserProposed(address userAddress, string ipfsHash);
  event NewLicenseProposed(address licenseAddress, string streamId);
  event UserJoined(address userAddress);
  event UserRejected(address userAddress);
  event LicenseApproved(address licenseAddress);
  event LicenseRejected(address licenseAddress);
  event VoteSent(address userAddress, address voting, uint8 vote);

  modifier memberOnly() {
    require(members[msg.sender] == true, "You need to be a member");
    _;
  }

  constructor(uint256 _quorum, uint256 _support) {
    members[msg.sender] = true;
    totalMembers = 1;
    quorum = _quorum; // 3000 for 30%
    support = _support; // 5000 for 50%
    emit UserJoined(msg.sender);
  }

  function newProposal(
    address _proposed,
    ProposalType _proposalType,
    string calldata _document
  ) external {
    Proposal storage proposal = proposals[_proposed];

    if (_proposalType == ProposalType.MEMBER) {
      require(proposal.deadline != 0 || members[_proposed] == false, "User is in the dao or already proposed");
      emit NewUserProposed(_proposed, _document);
    } else if (_proposalType == ProposalType.LICENSE) {
      require(members[msg.sender] == true, "You need to be a member");
      require(proposal.deadline != 0 || licenses[_proposed] == false, "License is approved or already proposed");
      emit NewLicenseProposed(_proposed, _document);
    }

    proposal.deadline = block.timestamp + proposalDuration;
    proposal.proposalType = _proposalType;
  }

  /// Vote yes/no on a given proposal
  function voteOnProposal(address _proposed, voteType _vote) external memberOnly {
    Proposal storage proposal = proposals[_proposed];
    voteType prevUserVote = proposal.votes[msg.sender];
    require(_vote != voteType.NONE, "You cannot take back your vote");
    require(_vote != prevUserVote, "You cannot cast same vote");
    require(proposal.deadline > block.timestamp, "Inactive or not existing proposal");

    if (_vote == voteType.AGAINST) {
      proposal.votesAgainst += 1;
    } else {
      proposal.votesFor += 1;
    }

    if (proposal.votes[msg.sender] != voteType.NONE) {
      if (_vote == voteType.AGAINST) {
        proposal.votesAgainst -= 1;
      } else {
        proposal.votesFor -= 1;
      }
    }
    proposal.votes[msg.sender] = _vote;
    emit VoteSent(msg.sender, _proposed, uint8(_vote));
  }

  /// Execute a proposal
  function executeProposal(address _proposed) external {
    Proposal storage proposal = proposals[_proposed];

    require(
      (block.timestamp <= proposal.deadline &&
        (proposal.votesFor + proposal.votesAgainst) > quorum &&
        (proposal.votesFor * 10000) / (proposal.votesFor + proposal.votesAgainst) > support) || block.timestamp > proposal.deadline,
      "You cannot execute active proposal"
    );

    if (proposal.proposalType == ProposalType.MEMBER) {
      addUser(_proposed);
    } else {
      addLicense(_proposed);
    }

    proposal.deadline = 0;
    // delete proposal;
  }

  function addUser(address userAddress) internal {
    members[userAddress] = true;
    totalMembers += 1;
    emit UserJoined(userAddress);
  }

  function addLicense(address licenseAddress) internal {
    licenses[licenseAddress] = true;
    emit LicenseApproved(licenseAddress);
    ///we need to decide what to do
  }
}
