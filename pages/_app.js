import '../styles/globals.css'
import Mode from '../components/Shared/Mode'
import Web3Provider, { useWeb3Context } from 'web3-react'
import { connectors } from '../components/Token/web3_react'
import { useEffect } from 'react'

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
