import Header from './Header.js'
import Footer from './Footer.js'
import Head from 'next/head'
import { useState } from 'react'

const Layout = ({ children }) => {

    const [load, setLoad] = useState(false)

    setTimeout(() => {
        setLoad(true)
    }, 200)

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
                : ""}

        </div>
    )
}

export default Layout