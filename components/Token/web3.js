import Web3 from 'web3'
import { ethers } from "ethers";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

export default web3
