import '../styles/globals.css'
import Mode from '../components/Shared/Mode'
import Web3Provider from 'web3-react'
import { connectors } from '../components/Token/web3_react'

function MyApp({ Component, pageProps }) {

  console.log(connectors)

  return (
    <div>
      <Web3Provider
        connectors={connectors}
        libraryName={'ethers.js'}>
        <Mode>
          <Component {...pageProps} />
        </Mode>
      </Web3Provider>
    </div>
  )
}

export default MyApp
