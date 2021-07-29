// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.5;
pragma experimental ABIEncoderV2;

import './Token.sol';

contract CoinFactory {
    
    Token token;
    mapping (string => address) public tokensCreated;
    mapping (address => string) public owners;
    string[] private names;
    
    event TokenCreated (address owner, address token, string name);

    function createERC20Token (string memory _name, string memory _symbol, uint256 _amount) external returns (address) {
        token = new Token (_name, _symbol, _amount, msg.sender);
        tokensCreated[_name] = address(token);
        names.push(_name);
        emit TokenCreated(msg.sender, address(token), _symbol);
        return address(token);
    }
    
    function numberOfTokens () external view returns (uint) {
        return names.length;
    }
    
    function getNames() external view returns (string[] memory) {
        return names;
    }
}