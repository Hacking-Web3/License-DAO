import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  LicenseDAO,
  NewUserProposed,
  UserJoined,
  VoteSent
} from "../generated/LicenseDAO/LicenseDAO";
import { MemberProposal, JoinedUser, Voting } from "../generated/schema";

export function handleNewUserProposed(event: NewUserProposed): void {
  let userAddress = event.params.userAddress.toHexString();

  let memberProposal = MemberProposal.load(userAddress);

  if (memberProposal == null) {
    memberProposal = new MemberProposal(userAddress);
    memberProposal.address = event.params.userAddress;
    memberProposal.ipfsHash = event.params.ipfsHash;
    memberProposal.createdAt = event.block.timestamp;
    memberProposal.status = "pending";
    /* memberProposal.transactionHash = event.transaction.hash; */
    memberProposal.save();
  }
}

export function handleUserJoined(event: UserJoined): void {
  let userAddress = event.params.userAddress.toHexString();

  let user = JoinedUser.load(userAddress + "-" + event.transaction.hash.toHex());

  if (user == null) {
    user = new JoinedUser(userAddress + "-" + event.transaction.hash.toHex());
    user.address = event.params.userAddress;
    user.createdAt = event.block.timestamp;

    let proposal = MemberProposal.load(userAddress);

    if (proposal != null) {
      proposal.status = "accepted";
      proposal.save();
    }
    user.save();
  }
}

export function handleVoteSent(event: VoteSent): void {
  let userAddress = event.params.userAddress.toHexString();

  let memberProposal = MemberProposal.load(userAddress);
  let voting = Voting.load(userAddress);
}