import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import React, { useState, useRef } from 'react'
import contract from './CoinFactory.js'
import Snackbar from '../Shared/Snackbar'
import saveToken from '../Database/SaveTokens.js'
import CircularProgress from '@material-ui/core/CircularProgress'


const CreateToken = () => {

    const [name, setName] = useState(null)
    const [symbol, setSymbol] = useState(null)
    const [amount, setAmount] = useState(null)
    const [address, setAddress] = useState(false)
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [emptyFields, setEmptyFields] = useState(false)


    const createERC20Token = async (Name, Symbol, Amount) => {
        try {
            contract.methods.createERC20Token(Name, Symbol, Amount).send({ from: ethereum.selectedAddress }).on('transactionHash', () => {
                setAlert(true)
            }).then(async (address) => {
                setLoading(false)
                setAddress(address.events[0].address)
                await saveToken(Name, address.events[0].address)
            })
        } catch (err) {
            setLoading(false)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false)
        setEmptyFields(false)
    }

    return (
        <>
            <div className="center">
                {loading ? <>
                    <>
                        <CircularProgress />
                    </>
                </>
                    :
                    (<div>
                        <div>
                            <TextField
                                size="medium"
                                variant="outlined"
                                margin="normal"
                                required
                                id="token"
                                label="Token Name"
                                name="tokenname"
                                style={{ width: 300, margin: 10 }}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                size="medium"
                                variant="outlined"
                                margin="normal"
                                required
                                id="symbol"
                                label="Token Symbol"
                                name="symbol"
                                style={{ width: 300, margin: 10 }}
                                onChange={(e) => {
                                    setSymbol(e.target.value)
                                }}
                            />
                            <div>
                            </div>
                            <TextField
                                size="medium"
                                variant="outlined"
                                margin="normal"
                                required
                                id="initialAmount"
                                label="Initial Amount"
                                name="initialAmount"
                                type="number"
                                style={{ width: 300, margin: 10 }}
                                onChange={(e) => {
                                    setAmount(e.target.valueAsNumber)
                                }}
                            />
                        </div>
                        <div className="center">
                            <Button
                                class="button"
                                style={{ margin: 10 }}
                                onClick={() => {
                                    if (name && symbol && amount) {
                                        createERC20Token(name, symbol, amount)
                                        setLoading(true)
                                    } else {
                                        setEmptyFields(true)
                                    }
                                }}
                            >Create a Token</Button>
                        </div>
                        <Snackbar open={emptyFields} autoHideDuration={2000} onClose={handleClose} severity="error" message="Please fill out every field" />
                        <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose} severity="success" operation="creation of ERC20 Token" />
                    </div>
                    )
                }
            </div>
            <div className="center">
                {address ? <p className="textNunito" >Token was deployed at: <b> {"\n" + address} </b></p> : ""}
            </div>
        </>
    )
}


export default CreateToken