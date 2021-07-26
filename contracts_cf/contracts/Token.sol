// SPDX-License-Identifier: MIT

pragma solidity ^0.7.5;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor (string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, 100000*10**decimals());
    }
}