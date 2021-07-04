import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Header = () => {
    return (
        <div>
            <h1 className={styles.title}>
                Welcome to <a href="https://blankhq.co/internship">Crypto internship!</a>
            </h1>
            <nav>
                <Link href="/" ><a>Create a Token</a></Link>
                <Link href="/sendOrSign" ><a>Send/Sign</a></Link>
                <Link href="/about" ><a>About</a></Link>
            </nav>
        </div>
    )
}

export default Header;