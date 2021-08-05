import Header from './Header.js'
import Footer from './Footer.js'
import Head from 'next/head'
import web3 from '../Token/web3.js'
import SwitchToRopsten from './SwitchToRopsten.js'
import { useState, useStyles, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Layout = ({ children }) => {

    const [load, setLoad] = useState(false)
    const [chain, setChain] = useState(0)

    useEffect(() => {
        network()
        ethereum.on('chainChanged', chain => { setChain(chain) })
    })

    setTimeout(() => {
        setLoad(true)
    }, 400)

    const network = async () => {
        const id = await web3.eth.net.getId()
        setChain(id)
    }


    return (
        <div className="content" >
            <Head>
                <title>Crypto internship</title>
                <link rel="icon" href="/token.png" />
            </Head>
            <Header />
            {load ? <>
                {chain == 3 ? children : <SwitchToRopsten />}
                <Footer />
            </>
                : <div className="center"> <CircularProgress /> </div>}

        </div>
    )
}

export default Layout