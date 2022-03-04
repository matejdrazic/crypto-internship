import styles from '../../styles/Home.module.css'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import Button from '@material-ui/core/Button'
import * as clipboard from "clipboard-polyfill/text"
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';
import { useMediaQuery, useTheme } from '@material-ui/core'
import { useState, useEffect, useContext } from 'react'
import web3 from '../Token/web3.js'
import ethPrice from './EthPrice.js'
import { useWeb3Context } from 'web3-react'

const Footer = (props) => {

    const [address, setAddress] = useState(null)
    const [balance, setBalance] = useState(0)
    const [balanceInUSD, setBalanceInUSD] = useState(0)
    const [isBalance, setIsBalance] = useState(true)
    const context = useWeb3Context()

    const theme = useTheme()

    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const handleBalanceClick = () => {
        setIsBalance(!isBalance)
    }

    useEffect(async () => {
        setAddress(context.account)
        const ethAmountInWei = await web3.eth.getBalance(context.account)
        const ethAmount = web3.utils.fromWei(ethAmountInWei, 'ether')
        const eth = ethAmount.substring(0, 6)
        setBalance(eth)
        const price = await ethPrice()
        const balanceUSD = price * parseFloat(eth)
        setBalanceInUSD(balanceUSD.toFixed(2))
    })

    // This function is to replace the 'connect' button necessary on the page in case user goes to /dashboard path since 
    // Auth doesnt make sense anymore
    
    const maybeConnect = () => {
        context.account ? null : context.setConnector('MetaMask')
    }

    return (
        <footer className={styles.footer}>
            <Container component="main" maxWidth="s">
                <Box display="flex" justifyContent="space-between" className={styles.flex} >
                    <Box className={isMatch ? "hidden" : "textNunito"} onClick={() => { handleBalanceClick() }} width="160px">
                        <Button class="button"> {isBalance ? balance + " ETH" : balanceInUSD + " USD"} </Button>
                    </Box>
                    <Box className="border" onClick={() => { maybeConnect() }} >
                        {context.account ? context.account.substring(0, 8) + ' ... ' + context.account.substring(context.account.length - 6, context.account.length) : "Account not connected"}
                        <Button>
                            <FileCopyOutlinedIcon onClick={() => { clipboard.writeText(address) }} />
                        </Button>
                    </Box>
                    <Box className={isMatch ? "center" : ""} >
                        <Button class="button" >{props.chainName}</Button>
                    </Box>
                </Box>
            </Container>
        </footer>
    )
}


export default Footer