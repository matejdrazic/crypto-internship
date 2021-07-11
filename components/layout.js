import Header from './Header.js'
import Footer from './Footer.js'
import Head from 'next/head'

const Layout = ({ children }) => {

    return (
        <div className="content" >
            <Head>
                <title>Crypto internship</title>
                <link rel="icon" href="/token.png" />
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout