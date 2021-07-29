import Header from './Header.js'
import Footer from './Footer.js'
import Head from 'next/head'
import { useState, useStyles } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const Layout = ({ children }) => {

    const [load, setLoad] = useState(false)

    setTimeout(() => {
        setLoad(true)
    }, 400)

    return (
        <div className="content" >
            <Head>
                <title>Crypto internship</title>
                <link rel="icon" href="/token.png" />
            </Head>
            <Header />
            {load ? <>
                {children}
                <Footer />
            </>
                :<div className="center"> <CircularProgress /> </div>}

        </div>
    )
}

export default Layout