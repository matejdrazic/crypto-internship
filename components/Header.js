import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { green, purple } from '@material-ui/core/colors'
import Image from 'next/image'
import { useState } from 'react'

const Header = () => {

    const router = useRouter()
    const [currentLink, setCurrentLink] = useState(0)

    return (
        <div>
            <nav>
                <Image src="/logo.png" alt="Page Logo" width={180} height={122} />
                <div className="logo" >
                    <h2>createatoken.xyz</h2>
                </div>
                <div class="textNunito">
                    <Link href="/dashboard" ><a class={router.pathname === "/dashboard" ? "selected" : "" } >Dashboard</a></Link>
                    <Link href="/explore" ><a class={router.pathname === "/explore" ? "selected" : "" } >Explore</a></Link>
                    <Link href="/createatoken" ><a class={router.pathname === "/createatoken" ? "selected" : "" } >Create a Token</a></Link>
                    <Link href="/about" ><a class={router.pathname === "/about" ? "selected" : "" } >About</a></Link>
                </div>
            </nav>
        </div>
    )
}

export default Header;