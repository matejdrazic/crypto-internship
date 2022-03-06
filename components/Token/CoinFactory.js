import { ethers } from 'ethers'
import { useWeb3Context } from 'web3-react'
import CoinFactory from '../../contracts_cf/build/contracts/CoinFactory.json'

// const contract = new web3.eth.Contract(CoinFactory.abi, '0xE62b7d6DAbf79cC1C43d7A4b5a394FfFFcD199FA')

const getContractFactory = () => {

    const context = useWeb3Context()

    const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/493558ff4f84473f906c7035fd91d2b7')

    const signer = provider.getSigner(context.address)

    const contract = new ethers.Contract('0xE62b7d6DAbf79cC1C43d7A4b5a394FfFFcD199FA', CoinFactory.abi, signer)

    return contract
}

export default getContractFactory
