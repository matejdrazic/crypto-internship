// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

import './SafeMath.sol';

contract ERC20 {
     using SafeMath for uint;
    
    string public name = '';
    string public symbol = '';
    uint8 public decimals = 8;
    uint public totalSupply;
    address contractOwner;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    mapping(address => uint) public nonces;

    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    // Only token creator can mint the tokens
    modifier canDo {
        require(msg.sender == contractOwner, "Not allowed!");
        _;
    }

    constructor (string memory _name, string memory _symbol, uint _totalSupply, address creator) public {
        
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        
        contractOwner = creator;
        balanceOf[msg.sender] = _totalSupply;
    }

    function mint(address to, uint value) external canDo {
        totalSupply = totalSupply.add(value);
        balanceOf[to] = balanceOf[to].add(value);
        emit Transfer(address(0), to, value);
    }

    function burn(address from, uint value) external {
        balanceOf[from] = balanceOf[from].sub(value);
        totalSupply = totalSupply.sub(value);
        emit Transfer(from, address(0), value);
    }

    function _approve(address owner, address spender, uint value) private {
        allowance[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _transfer(address from, address to, uint value) private {
        balanceOf[from] = balanceOf[from].sub(value);
        balanceOf[to] = balanceOf[to].add(value);
        emit Transfer(from, to, value);
    }

    function approve(address spender, uint value) external returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) external returns (bool) {
        if (allowance[from][msg.sender] != uint(0)) {
            allowance[from][msg.sender] = allowance[from][msg.sender].sub(value);
        }
        _transfer(from, to, value);
        return true;
    }
    
    // Allows users to sign approve messages without paying for gas.
    // Gas is paid by third-party that wishes to send their transaction to the blockchain.
    // This function verifies the message and the signee.

    // Could be a problem to implement in front-end

    function permit(address owner, address spender, uint value, bytes32 r, bytes32 s, uint8 v) external {
        require(owner != address(0) && spender != address(0), "Invalid address");

        bytes32 digest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", keccak256(abi.encodePacked(owner, spender, value, nonces[owner]++))));
        
        address recoveredAddress = ecrecover(digest, v, r, s);

        require(recoveredAddress == owner, "Invalid signature!");
         _approve(owner, spender, value);
    }
}