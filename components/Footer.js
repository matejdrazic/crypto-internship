import styles from '../styles/Home.module.css'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import Button from '@material-ui/core/Button'
import * as clipboard from "clipboard-polyfill/text"
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';
import { useMediaQuery, useTheme } from '@material-ui/core'

const Footer = () => {

    const router = useRouter()
    const theme = useTheme()

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        isMatch ? (
            <footer className={styles.footer}>
                <Container component="main" maxWidth="s">
                    <Button class="button" onClick={() => {
                        Cookies.remove('address')
                        router.push('/')
                    }} >Log out</Button>
                </Container>
            </footer>
        ) : (
            <footer className={styles.footer}>
                <Container component="main" maxWidth="s">
                    <Box display="flex" justifyContent="space-between">
                        <Box class="textNunito">
                            Logged in: {Cookies.get("address") ? Cookies.get("address") : "No one"}
                            <Button>
                                <FileCopyOutlinedIcon onClick={() => { clipboard.writeText(Cookies.get('address')) }} />
                            </Button>
                        </Box>
                        <Box>
                            <Button class="button" onClick={() => {
                                Cookies.remove('address')
                                router.push('/')
                            }} >Log out</Button>
                        </Box>
                    </Box>
                </Container>
            </footer>)
    )
}


export default Footer;