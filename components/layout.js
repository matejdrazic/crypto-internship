import Header from './header.js'
import Footer from './footer.js'

const Layout = ({ children }) => {
    return (
        <div className="content" >
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout