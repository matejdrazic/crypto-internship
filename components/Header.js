import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { green, purple } from '@material-ui/core/colors'
import Image from 'next/image'

const Header = () => {

    const router = useRouter()

    return (
        <div>
            <nav>
                <div className="logo" >
                    <Image src="/logo.png" alt="Page Logo" width={180} height={122} />
                    <h2>createatoken.xyz</h2>
                </div>
                <Link href="/dashboard" >Dashboard</Link>
                <Link href="/explore" >Explore</Link>
                <Link href="/createatoken" >Create a Token</Link>
                <Link href="/about" >About</Link>
            </nav>

        </div>
    )
}

export default Header;