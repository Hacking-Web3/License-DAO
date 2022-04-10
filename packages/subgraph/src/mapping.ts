import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  LicenceDAO,
  NewUserProposed
} from "../generated/LicenceDAO/LicenceDAO";
import { MemberProposal } from "../generated/schema";

export function handleMemberProposal(event: NewUserProposed): void {
  let userAddress = event.params.userAddress.toHexString();

  let memberProposal = MemberProposal.load(userAddress + event.transaction.hash);

  if (memberProposal == null) {
    memberProposal = new MemberProposal(userAddress.toHex() + "-" + event.transaction.hash.toHex());
    memberProposal.address = event.params.userAddress;
    memberProposal.ipfsHash = event.params.ipfsHash;
    memberProposal.createdAt = event.block.timestamp;
    memberProposal.transactionHash = event.transaction.hash;
    memberProposal.save();
  }
}
