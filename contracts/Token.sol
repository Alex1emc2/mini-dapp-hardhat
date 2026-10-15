// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;


contract Token {
    event Transfer(address indexed from, address indexed to, uint256 count);
    mapping(address => uint256) public token;
    mapping(address => mapping(address => uint256)) public allowance;
    
    constructor (uint256 _initialSupply) {
        token[msg.sender] = _initialSupply;
    }


    function getTokens(address people) public view returns (uint256) {
        return token[people];
    }

    function approve(address spender, uint256 amount) public {
        require(token[msg.sender] >= amount, "You didn't have enough tokens to allowance!!");
        allowance[msg.sender][spender] = amount;
    }

    function transferFrom(address from, address to, uint256 amount) public {
        require(allowance[from][msg.sender] >= amount, "You didn't have enough tokens!!");
        require(token[from] >= amount, "Owner didn't have enough tokens!!");
        allowance[from][msg.sender] -= amount;
        token[to] += amount;
        token[from] -= amount;

        emit Transfer(from, to, amount);
    }

    function transfer(address recipient, uint256 count) public {
        require(token[msg.sender] >= count, "You didn't have enough tokens!!");
        token[recipient] += count;
        token[msg.sender] -= count;

        emit Transfer(msg.sender, recipient, count);
    }
}