import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'

const Header = () => {

    const router = useRouter()

    return (
        <div>
            <h1 className={styles.title}>
                Welcome to <a href="https://blankhq.co/internship">Crypto internship!</a>
            </h1>
            <nav>
                <Link href="/dashboard" >Dashboard</Link>
                <Link href="/explore" >Explore</Link>
                <Link href="/createatoken" >Create a Token</Link>
                <Link href="/about" >About</Link>
                <Button color="secondary" onClick={() => {
                    Cookies.remove('address')
                    router.push('/')
                }} >Log out</Button>
            </nav>
        </div>
    )
}

export default Header;