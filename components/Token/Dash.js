import React, { useState } from 'react'
import TokenAction from "./TokenAction.js"
import styles from '../../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Snackbar from '../Shared/Snackbar'
import DropdownMenu from './DropdownMenu'
import web3 from './web3'
import MuiAlert from '@material-ui/lab/Alert'
import { useWeb3Context } from 'web3-react'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#ffb6e6',
        border: '2px solid #FF67F9',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Dash() {
    const [transferOpen, setTransferOpen] = useState(false)
    const [mintOpen, setMintOpen] = useState(false)
    const [validAmount, setValidAmount] = useState(true)
    const [validTransferAmount, setValidTransferAmount] = useState(true)
    const [amountTypedIn, setAmountTypedIn] = useState(0)
    const [addressTransfer, setAddressTransfer] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertAddress, setAlertAddress] = useState(false)
    const [operation, setOperation] = useState("")
    const [names, setNames] = useState(null)
    const [tokenContract, setTokenContract] = useState(null)
    const [tokenSymbol, setTokenSymbol] = useState(null)
    const [isToken, setIsToken] = useState(false)
    const [balance, setBalance] = useState(0)
    const [hasTokens, setHasTokens] = useState(false)
    const context = useWeb3Context()

    const classes = useStyles();

    const handleTransferOpen = () => {
        setTransferOpen(true);
    };

    const handleTransferClose = () => {
        setTransferOpen(false);
    };

    const handleMintOpen = () => {
        setMintOpen(true);
    };

    const handleMintClose = () => {
        setMintOpen(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false)
        setAlertAddress(false)
        setIsToken(false)
        setHasTokens(false)
    }

    let mint = async (to, amount) => {
        tokenContract.methods._mint(to, amount).send({ from: context.account }).on('receipt', (tx) => {
            setBalance(amountTypedIn + balance)
            setAlert(true)
            setOperation("minting")
            handleMintClose()
        })
    }

    let transfer = async (to, amount) => {
        tokenContract.methods.transfer(to, amount).send({ from: context.account }).on('receipt', (tx) => {
            setBalance(balance - amountTypedIn)
            setAlert(true)
            setOperation("transfer")
            handleTransferClose()
        })
    }

    return (
        <>
            <div className={styles.flex} >
                <DropdownMenu tokenNames={names} setTokenContract={setTokenContract} setTokenSymbol={setTokenSymbol} setBalance={setBalance} setHasTokens={setHasTokens} />
            </div>
            <div className={styles.flex} >
                <TokenAction title="Transfer" icon={0} onClick={() => { tokenContract ? setTransferOpen(true) : setIsToken(true) }} tokenSymbol={tokenSymbol} balance={balance} />
                <TokenAction title="Mint" icon={1} onClick={() => { tokenContract ? setMintOpen(true) : setIsToken(true) }} tokenSymbol={tokenSymbol} balance={balance} />
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={transferOpen}
                    onClose={handleTransferClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={transferOpen}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Transfer</h2>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="number"
                                    step=".01"
                                    id="amountToTransfer"
                                    label="Transfer amount"
                                    name="amountToTransfer"
                                    helperText={"Please enter valid ether amount"}
                                    error={!validTransferAmount}
                                    onChange={(e) => {
                                        setAmountTypedIn(parseFloat(e.target.value))
                                        balance >= parseFloat(e.target.value) && parseFloat(e.target.value) >= 0 ? setValidTransferAmount(true) : setValidTransferAmount(false)
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    id="ethAddress"
                                    label="Ethereum Address"
                                    name="ethAddress"
                                    onChange={(e) => {
                                        setAddressTransfer(e.target.value.toString())
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    class="button"
                                    onClick={() => {
                                        if (web3.utils.isAddress(addressTransfer) && validTransferAmount) {
                                            let amountInWei = web3.utils.toWei(amountTypedIn.toString(), 'ether')
                                            transfer(addressTransfer, amountInWei)
                                        } else {
                                            setAlertAddress(true)
                                        }
                                    }} >Transfer</Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={mintOpen}
                    onClose={handleMintClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={mintOpen}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Mint</h2>
                            <div>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    type="number"
                                    id="mint"
                                    label="Amount"
                                    name="mint"
                                    error={!validAmount}
                                    autoFocus
                                    helperText="Please enter valid ethereum amount"
                                    onChange={(e) => {
                                        parseFloat(e.target.value) > 0 ? setValidAmount(true) : setValidAmount(false)
                                        setAmountTypedIn(parseFloat(e.target.value))
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    class="button"
                                    onClick={() => {
                                        if (validAmount) {
                                            let amountInWei = web3.utils.toWei(amountTypedIn.toString(), 'ether')
                                            mint(ethereum.selectedAddress, amountInWei)
                                        }
                                    }} >MINT</Button>
                            </div>
                        </div>
                    </Fade>

                </Modal>

                <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose} severity="success" operation={operation} />
                <Snackbar open={alertAddress} autoHideDuration={2000} onClose={handleClose} severity="error"
                    message={"Address or amount not valid!"} />
                <Snackbar open={isToken} autoHideDuration={2000} onClose={handleClose} severity="error" message="Select a Token!" />
                <Snackbar open={hasTokens} autoHideDuration={4000} onClose={handleClose} severity="error"
                    message="No tokens created, redirecting to /createatoken ..." />

            </div>
        </>
    )
}