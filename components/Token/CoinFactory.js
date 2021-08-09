import web3 from './web3'
import CoinFactory from '../../contracts_cf/build/contracts/CoinFactory.json'

const contract = new web3.eth.Contract(CoinFactory.abi, '0xE62b7d6DAbf79cC1C43d7A4b5a394FfFFcD199FA')

export default contract
