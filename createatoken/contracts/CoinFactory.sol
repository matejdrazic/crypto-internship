// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import './ERC20.sol';

contract CoinFactory {
    
    ERC20 token;
    mapping (string => address) public tokensCreated;
    mapping (address => string) public owners;
    string[] private names;
    
    event TokenCreated (address owner, address token, string name);

    function createERC20Token (string calldata _name, string calldata _symbol, uint _totalSupply, address owner) external returns (address) {
        token = new ERC20 (_name, _symbol, _totalSupply, owner);
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