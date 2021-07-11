import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Cookies from 'js-cookie'
import styles from '../styles/Home.module.css'
import Box from '@material-ui/core/Box'

const AddressSearch = () => {
    const [validAddress, setValidAddress] = useState(false)
    const [balance, setBalance] = useState("")
    const [addressTypedIn, setAddressTypedIn] = useState("")

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box display="flex" justifyContent="space-between">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="ethAddress"
                        label="Ethereum Address"
                        name="ethAddress"
                        autoFocus
                        helperText={validAddress ? "Address looks good" : "Please enter valid ethereum address"}
                        error={!validAddress}
                        onChange={(e) => {
                            e.target.value.length === 42 ? setValidAddress(true) : setValidAddress(false)
                            setAddressTypedIn(e.target.value)
                        }}
                    />
                    <Button
                        color="primary"
                        onClick={() => {
                            if (validAddress) {
                                console.log()
                                if (!localStorage.hasOwnProperty(addressTypedIn)) {
                                    localStorage.setItem(addressTypedIn, 0)
                                    setBalance(0)
                                } else {
                                    console.log(localStorage.getItem(addressTypedIn))
                                    setBalance(localStorage.getItem(addressTypedIn))
                                }
                            }
                        }}
                    >Explore</Button>
                </Box>
                <div>
                    <p>Balance is: {balance} </p>
                </div>
            </Container>
        </div >
    )
}

export default AddressSearch