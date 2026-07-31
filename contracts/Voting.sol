// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


contract Voting {
  mapping(string => uint256) public votes;
  mapping (address => bool) hasVoted;

  function vote(string memory candidate) public {
    require(!hasVoted[msg.sender], "You already voted");
    hasVoted[msg.sender] = true;
    votes[candidate] += 1;
  }

  function getVotes(string memory candidate) public view returns (uint256) {
    return votes[candidate];
  }
}