// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CCERC721 is ERC721 {
  constructor() public ERC721("Creative Commons NFT", "CCNFT") {}
}
