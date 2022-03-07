import { ethers } from 'ethers'

export const provider = new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`)

