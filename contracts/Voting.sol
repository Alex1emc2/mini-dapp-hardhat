// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


contract Voting {
  mapping(string => uint256) public votes;

  function vote(string memory candidate) public {
    votes[candidate] += 1;
  }

  function getVotes(string memory candidate) public view returns (uint256) {
    return votes[candidate];
  }
}