import Header from './Header.js'
import Footer from './Footer.js'
import Head from 'next/head'
import SwitchToRopsten from './SwitchToRopsten.js'
import React, { useState, useContext, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from './Themes.js'
import { ThemeContext } from './Mode.js'
import { useWeb3Context } from 'web3-react'

const Layout = ({ children }) => {

    const [load, setLoad] = useState(false)
    const mode = useContext(ThemeContext)
    const context = useWeb3Context()

    useEffect(() => {
        context.setFirstValidConnector(['MetaMask'])
    }, [])

    setTimeout(() => {
        setLoad(true)
    }, 400)

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
                return 'Not sure'
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
                        {context.networkId == 3 && context.account? children : <SwitchToRopsten />}
                        <Footer chainName={getChainName(context.networkId)} />
                    </>
                    : <div className="center"> <CircularProgress /> </div>}
            </div>
        </ThemeProvider>
    )
}

export default Layout