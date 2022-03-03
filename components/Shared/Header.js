import Link from 'next/link'
import Menu from './Menu'
import Button from '@material-ui/core/Button'
import Image from 'next/image'
import Box from '@material-ui/core/Box'
import { HiMoon } from 'react-icons/hi'
import { CgSun } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { useMediaQuery, useTheme } from '@material-ui/core'
import { useContext } from 'react'
import { ThemeContext, ThemeContextChange } from './Mode'

const Header = () => {

    const router = useRouter()
    const thems = useTheme()
    const mode = useContext(ThemeContext)
    const setMode = useContext(ThemeContextChange)

    const isMatch = useMediaQuery(thems.breakpoints.down('sm'))

    const changeTheme = () => {
        mode ? setMode(false) : setMode(true)
    }

    const icon = mode ? <HiMoon size={40} /> : <CgSun size={40} />

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
                        <Button onClick={() => { console.log(mode);changeTheme() }} >
                            {icon}
                        </Button>
                    </div>
                </nav>
            </div>)
    )
}

export default Header;