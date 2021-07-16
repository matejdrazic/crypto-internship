import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Cookies from 'js-cookie'
import styles from '../styles/Home.module.css'
import Box from '@material-ui/core/Box'
import Web3 from 'web3'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddressSearch = () => {
    const [validAddress, setValidAddress] = useState(false)
    const [balance, setBalance] = useState("")
    const [address, setAddress] = useState("")
    const [alert, setAlert] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };

    return (
        <div>
            <div width="100px">
                <TextField
                    size="medium"
                    variant="outlined"
                    margin="normal"
                    required
                    id="ethAddress"
                    label="Ethereum Address"
                    name="ethAddress"
                    autoFocus
                    style = {{width: 440}}
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }}
                />
            </div>
            <div>
                <Button
                    class="button"
                    onClick={() => {
                        if (web3.utils.isAddress(address)) {
                            console.log()
                            if (!localStorage.hasOwnProperty(address)) {
                                localStorage.setItem(addressTypedIn, 0)
                                setBalance(0)
                            } else {
                                console.log(localStorage.getItem(address))
                                setBalance(localStorage.getItem(address))
                            }
                        } else {
                            setAlert(true)
                        }
                    }}
                >Explore</Button>
            </div>
            <p class="textNunito textSize" >Balance: <b>{balance}</b> ETH </p>

            <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>
                    Address invalid!
                </Alert>
            </Snackbar>
        </div >
    )
}

export default AddressSearch