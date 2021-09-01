import React, { useState, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import styles from '../../styles/Home.module.css'
import MuiAlert from '@material-ui/lab/Alert'
import web3 from './web3'
import Snackbar from '../Shared/Snackbar'
import getNames from '../Database/TokenNames.js'
import Token from '../../contracts_cf/build/contracts/Token.json'
import getAddress from '../Database/TokenAddress.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ContactsOutlined } from '@material-ui/icons'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddressSearch = () => {
    const [validAddress, setValidAddress] = useState(false)
    const [userAddress, setUserAddress] = useState("")
    const [userAddressClick, setUserAddressClick] = useState("")
    const [alert, setAlert] = useState(false)
    const [balances, setBalances] = useState([])
    const [loading, setLoading] = useState(false)
    const [names, setNames] = useState(false)


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false)
    }

    const explore = async () => {
        setLoading(true)
        const tokenNames = await getNames()
        setNames(tokenNames)
        try {
            let array = []
            for (let tokenName of tokenNames) {
                const address = await getAddress(tokenName)
                const tokenContract = new web3.eth.Contract(Token.abi, address)
                const balance = await tokenContract.methods.balanceOf(userAddress).call({ from: ethereum.selectedAddress })
                const balanceEth = web3.utils.fromWei(balance, 'ether')
                array.push(balanceEth)
            }
            setBalances(array)

        } catch (err) {
            console.log(err)
        }
        setLoading(false)
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
                        setUserAddress(e.target.value)
                    }}
                />
                <Button
                    class="button"
                    style={{ margin: 13 }}
                    onClick={() => {
                        if (web3.utils.isAddress(userAddress)) {
                            explore()
                        } else {
                            setAlert(true)
                        }
                    }}
                >Explore</Button>
            </div>

            <div className="marginTop" >
                {loading ?
                    <div className="center">
                        <CircularProgress />
                    </div>
                    :
                    <table className="center">
                        {
                            balances.map((balance, index) => {
                                return <tr key={index} className="textNunito textSize"> <td>{names[index]}:</td>&nbsp;&nbsp;<td>{balance}</td> </tr>
                            })
                        }
                    </table>
                }
            </div>

            <Snackbar open={alert} autoHideDuration={4000} onClose={handleClose} severity="error"
                message="Address invalid" />
        </div >
    )
}

export default AddressSearch