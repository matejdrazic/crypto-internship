// SPDX-License-Identifier: MIT

pragma solidity ^0.7.5;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor (string memory _name, string memory _symbol, uint256 amount, address deployer) ERC20(_name, _symbol) {
        _mint(deployer, amount*10**decimals());
    }
}