import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  LicenseDAO,
  NewUserProposed,
  UserJoined
} from "../generated/LicenseDAO/LicenseDAO";
import { MemberProposal, User } from "../generated/schema";

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
