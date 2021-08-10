import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Cookies from 'js-cookie'
import styles from '../../styles/Home.module.css'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import web3 from './web3'
import DropdownMenu from './DropdownMenu'
import contract from './CoinFactory.js'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddressSearch = () => {
    const [validAddress, setValidAddress] = useState(false)
    const [balance, setBalance] = useState(0)
    const [balanceToken, setBalanceToken] = useState(0)
    const [address, setAddress] = useState("")
    const [alert, setAlert] = useState(false)
    const [names, setNames] = useState(null)
    const [tokenContract, setTokenContract] = useState(null)
    const [tokenSymbol, setTokenSymbol] = useState(null)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };

    useEffect(async () => {
        contract.methods.getNames().call({ from: ethereum.selectedAddress }).then(names => { setNames(names) })
    })

    const explore = async () => {
        await tokenContract.methods.balanceOf(address.toString()).call({ from: ethereum.selectedAddress }).then(bal => {
            const gotTokens = web3.utils.fromWei(bal, 'ether')
            setBalanceToken(gotTokens)
        })
    }

    return (
        <div className="center">
            <div className={styles.flex} >
                <TextField
                    size="medium"
                    variant="outlined"
                    margin="normal"
                    required
                    id="ethAddress"
                    label="Ethereum Address"
                    name="ethAddress"
                    style={{ width: 300, margin: 10 }}
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }}
                />
                <DropdownMenu names={names} setTokenContract={setTokenContract} setTokenSymbol={setTokenSymbol} setBalance={setBalance} />
            </div>
            <div>
                <Button
                    class="button"
                    style={{ margin: 13 }}
                    onClick={() => {
                        if (web3.utils.isAddress(address) && tokenContract) {
                            explore()
                        } else {
                            setAlert(true)
                        }
                    }}
                >Explore</Button>
            </div>
            <div className="center">
            <p className="textNunito textSize" >Balance: <b>{balanceToken}</b> {tokenSymbol ? tokenSymbol : ""} </p>
            </div>
            <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>
                    Address invalid or contract not selected!
                </Alert>
            </Snackbar>
        </div >
    )
}

export default AddressSearch