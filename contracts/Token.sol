// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;


contract Token {
    mapping(address => uint256) public token;
    
    constructor (uint256 _initialSupply) {
        token[msg.sender] = _initialSupply;
    }

    function getTokens(address people) public view returns (uint256) {
        return token[people];
    }

    function transfer(address recipient, uint256 count) public {
        require(token[msg.sender] >= count, "You didn't have enough tokens!!");
        token[recipient] += count;
        token[msg.sender] -= count;
    }
}