import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  LicenseDAO,
  NewUserProposed,
  UserJoined,
  VoteSent,
} from "../generated/LicenseDAO/LicenseDAO";
import { MemberProposal, User, Voting } from "../generated/schema";

export function handleNewUserProposed(event: NewUserProposed): void {
  let userAddress = event.params.userAddress.toHexString();

  let memberProposal = MemberProposal.load(userAddress);

  if (memberProposal == null) {
    memberProposal = new MemberProposal(userAddress);
    memberProposal.address = event.params.userAddress;
    memberProposal.ipfsHash = event.params.ipfsHash;
    memberProposal.createdAt = event.block.timestamp;
    memberProposal.status = "pending";
    memberProposal.numberVotes = 0;
    memberProposal.votesFor = 0;
    memberProposal.votesAgainst = 0;
    /* memberProposal.transactionHash = event.transaction.hash; */
    memberProposal.save();
  }
}

export function handleUserJoined(event: UserJoined): void {
  let userAddress = event.params.userAddress.toHexString();

  let user = User.load(userAddress);

  if (user == null) {
    user = new User(userAddress);
    user.address = event.params.userAddress;
    user.createdAt = event.block.timestamp;

    let proposal = MemberProposal.load(userAddress);

    if (proposal != null) {
      user.memberProposal = proposal.id;
      proposal.status = "accepted";
      proposal.save();
    }
    user.save();
  }
}

export function handleVoteSent(event: VoteSent): void {
  let userAddress = event.params.userAddress.toHexString();

  let memberProposal = MemberProposal.load(event.params.voting.toHexString());
  let voting = Voting.load(
    event.params.voting.toHexString() + "-" + userAddress
  );

  let vote = event.params.vote;

  if (voting == null) {
    voting = new Voting(event.params.voting.toHexString() + "-" + userAddress);
    voting.address = event.params.userAddress;
    voting.proposalAddress = event.params.voting;
    if (memberProposal != null) {
      memberProposal.numberVotes += 1;
      if (vote == 1) {
        memberProposal.votesFor += 1;
      }
      if (vote == 2) {
        memberProposal.votesAgainst += 1;
      }
    }
  } else {
    if (voting.vote != vote && memberProposal != null) {
      if (voting.vote == 1) {
        memberProposal.votesFor -= 1;
      }
      if (voting.vote == 2) {
        memberProposal.votesAgainst -= 1;
      }
    }
  }
  if (memberProposal != null) {
    memberProposal.save();
  }
  voting.vote = event.params.vote;
  voting.save();
}

