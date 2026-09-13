// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;


contract Voting {
  mapping(string => uint256) public votes;
  mapping (address => bool) hasVoted;
  string[] public candidates;
  uint256 public allVotes;

  constructor (string[] memory _candidates) {
    candidates = _candidates;
  }

  function vote(string memory candidate) public {
    require(!hasVoted[msg.sender], "You already voted");
    hasVoted[msg.sender] = true;
    votes[candidate] += 1;
    allVotes += 1;
  }

  function getVotes(string memory candidate) public view returns (uint256) {
    return votes[candidate];
  }

  function getAllCandidates() public view returns (string[] memory) {
    return candidates;
  }

  function getAllVotes() public view returns (uint256) {
    return allVotes;
  }
}