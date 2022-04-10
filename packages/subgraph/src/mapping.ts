import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  LicenseDAO,
  NewUserProposed
} from "../generated/LicenseDAO/LicenseDAO";
import { MemberProposal } from "../generated/schema";

export function handleNewUserProposed(event: NewUserProposed): void {
  let userAddress = event.params.userAddress.toHexString();

  let memberProposal = MemberProposal.load(userAddress + "-" + event.transaction.hash.toHex());

  if (memberProposal == null) {
    memberProposal = new MemberProposal(userAddress + "-" + event.transaction.hash.toHex());
    memberProposal.address = event.params.userAddress;
    memberProposal.ipfsHash = event.params.ipfsHash;
    memberProposal.createdAt = event.block.timestamp;
    /* memberProposal.transactionHash = event.transaction.hash; */
    memberProposal.save();
  }
}
