import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Menu from './Menu'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { green, purple } from '@material-ui/core/colors'
import Image from 'next/image'
import { useState } from 'react'
import { useMediaQuery, useTheme } from '@material-ui/core'

const Header = () => {

    const router = useRouter()
    const theme = useTheme()

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        isMatch ? (<Menu />) : (
            <div>
                <nav>
                    <Image src="/logo.png" alt="Page Logo" width={180} height={122} />
                    <div className="logo" >
                        <h2>createatoken.xyz</h2>
                    </div>
                    <div className="textNunito">
                        <Link href="/dashboard" ><a className={router.pathname === "/dashboard" ? "selected" : ""} >Dashboard</a></Link>
                        <Link href="/explore" ><a className={router.pathname === "/explore" ? "selected" : ""} >Explore</a></Link>
                        <Link href="/createatoken" ><a className={router.pathname === "/createatoken" ? "selected" : ""} >Create a Token</a></Link>
                        <Link href="/about" ><a className={router.pathname === "/about" ? "selected" : ""} >About</a></Link>
                    </div>
                </nav>
            </div>)
    )
}

export default Header;