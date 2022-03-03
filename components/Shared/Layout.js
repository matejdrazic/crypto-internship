import Header from './Header.js'
import Footer from './Footer.js'
import Head from 'next/head'
import web3 from '../Token/web3.js'
import SwitchToRopsten from './SwitchToRopsten.js'
import React, { useState, useEffect, useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from './Themes.js'
import { useRouter } from 'next/router'
import { ThemeContext } from './Mode.js'

const Layout = ({ children }) => {

    const [load, setLoad] = useState(false)
    const [chain, setChain] = useState(0)
    const [address, setAddress] = useState(null)
    const mode = useContext(ThemeContext)
    const router = useRouter()

    useEffect(() => {
        try {
            network()
            ethereum.on('chainChanged', chain => { setChain(chain) })
            ethereum.on('accountsChanged', add => { setAddress(add[0]); setLoad(false) })
        } catch (error) {
            router.push('/')
        }
    })

    setTimeout(() => {
        setLoad(true)
    }, 400)

    const network = async () => {
        const id = await web3.eth.net.getId()
        setChain(id)
    }

    const getChainName = (chain) => {
        switch (chain) {
            case 1:
                return 'Mainnet'
            case 3:
                return 'Ropsten'
            case 4:
                return 'Rinkeby'
            case 5:
                return 'Goerli'
            case 42:
                return 'Kovan'
            default:
                return 'Ganache'
        }
    }

    return (
        <ThemeProvider theme={mode ? lightTheme : darkTheme} >
            <GlobalStyles />
            <div className="content" >
                <Head>
                    <title>Crypto internship</title>
                    <link rel="icon" href="/token.png" />
                </Head>
                <Header />
                {load ?
                    <>
                        {chain == 3 ? children : <SwitchToRopsten />}
                        <Footer chainName={getChainName(chain)} address={address ? address : ethereum.selectedAddress} />
                    </>
                    : <div className="center"> <CircularProgress /> </div>}
            </div>
        </ThemeProvider>
    )
}

export default Layout