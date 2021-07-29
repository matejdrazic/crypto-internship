import styles from '../../styles/Home.module.css'
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
import { useState, useEffect } from 'react'

const Footer = () => {

    const [address, setAddress] = useState(null)

    const router = useRouter()
    const theme = useTheme()

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        setAddress(ethereum.selectedAddress)
    })

    return (
            <footer className={styles.footer}>
                <Container component="main" maxWidth="s">
                    <Box display="flex" justifyContent="space-between">
                        <Box className={isMatch ? "hidden" : "textNunito"}>
                            Logged in: {address ? address : "No one"}
                            <Button>
                                <FileCopyOutlinedIcon onClick={() => { clipboard.writeText(address) }} />
                            </Button>
                        </Box>
                        <Box className={isMatch ? "center" : ""} >
                            <Button class="button" >Ropsten</Button>
                        </Box>
                    </Box>
                </Container>
            </footer>
    )
}


export default Footer