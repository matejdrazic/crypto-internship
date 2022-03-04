import { Connectors } from 'web3-react'

const { InjectedConnector, NetworkOnlyConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 3, 4, 5] })

const Infura = new NetworkOnlyConnector({
    providerURL: 'https://ropsten.infura.io/v3/493558ff4f84473f906c7035fd91d2b7'
})

export const connectors = { MetaMask, Infura }