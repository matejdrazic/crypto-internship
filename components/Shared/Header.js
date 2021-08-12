import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Menu from './Menu'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { green, purple } from '@material-ui/core/colors'
import Image from 'next/image'
import { useState } from 'react'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { CgSun } from 'react-icons/cg'
import { HiMoon } from 'react-icons/hi'
import Box from '@material-ui/core/Box'

const Header = (props) => {

    const router = useRouter()
    const theme = useTheme()

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const changeTheme = () => {
        props.theme === 'light' ? props.setTheme('dark') : props.setTheme('light')
    }

    const icon = props.theme === 'light' ? <HiMoon size={40} /> : <CgSun size={40} />

    return (
        isMatch ? (
            <Box display="flex" justifyContent="space-between">
                <Menu />
                <Button onClick={() => { changeTheme() }} >
                    {icon}
                </Button>
            </Box>
        ) : (
            <div>
                <nav>
                    <Image src="/logo.png" alt="Page Logo" width={180} height={122} />
                    <div className="logo" >
                        <Link href='/dashboard'>
                            <h2>createatoken.xyz</h2>
                        </Link>
                    </div>
                    <div className="textNunito">
                        <Link href="/dashboard" ><a className={router.pathname === "/dashboard" ? "selected" : ""} >Dashboard</a></Link>
                        <Link href="/explore" ><a className={router.pathname === "/explore" ? "selected" : ""} >Explore</a></Link>
                        <Link href="/createatoken" ><a className={router.pathname === "/createatoken" ? "selected" : ""} >Create a Token</a></Link>
                        <Link href="/about" ><a className={router.pathname === "/about" ? "selected" : ""} >About</a></Link>
                    </div>
                    <div className="themeChanger">
                        <Button onClick={() => { changeTheme() }} >
                            {icon}
                        </Button>
                    </div>
                </nav>
            </div>)
    )
}

export default Header;