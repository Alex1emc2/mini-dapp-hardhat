// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;


contract Counter {
    uint256 public count;

    function addCount(uint256 amount) public {
        count += amount;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function decreament(uint256 amount) public {
        require(count >= amount, "The counter can't under 0");
        count -= amount;
    }

    function reset() public {
        count = 0;
    }
}
