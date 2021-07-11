import React, { useState } from 'react'
import Auth from "./Auth.js"
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Card from "./Card.js"
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
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
    const [validAddress, setValidAddress] = useState(false)
    const [amountTypedIn, setAmountTypedIn] = useState(0)
    const [addressTypedIn, setAddressTypedIn] = useState("")
    const [alert, setAlert] = useState(false);
    const [operation, setOperation] = useState("");

    const address = Cookies.get("address")
    let ethAmount = parseFloat(localStorage.getItem(address))

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

        setAlert(false);
    };

    return (
        <div className={styles.flex} >
            <Card title="Transfer" icon={0} onClick={handleTransferOpen} />
            <Card title="Mint" icon={1} onClick={handleMintOpen} />
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
                                helperText={validAmount ? "Amount is decent." : "Invalid amount!"}
                                error={!validAmount}
                                onChange={(e) => {
                                    setAmountTypedIn(parseFloat(e.target.value))
                                    ethAmount >= parseFloat(e.target.value) ? setValidAmount(true) : setValidAmount(false)
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
                                error={!validAddress}
                                helperText={validAddress ? "Address looks good" : "Please enter valid ethereum address"}
                                onChange={(e) => {
                                    setAddressTypedIn(e.target.value)
                                    e.target.value.length === 42 ? setValidAddress(true) : setValidAddress(false)
                                }}
                            />
                        </div>
                        <div>
                            <Button onClick={() => {
                                if (validAddress && validAmount) {
                                    const newEthAmount = ethAmount - amountTypedIn
                                    localStorage.setItem(address, newEthAmount)
                                    if (!localStorage.getItem(addressTypedIn)) {
                                        localStorage.setItem(addressTypedIn, amountTypedIn)
                                    } else {
                                        const currentAmount = parseFloat(localStorage.getItem(addressTypedIn))
                                        const newEthAmountTwo = currentAmount + amountTypedIn
                                        localStorage.setItem(addressTypedIn, newEthAmountTwo)
                                    }
                                    setAlert(true)
                                    setOperation("transfer")
                                    handleTransferClose()
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
                                    setAmountTypedIn(parseFloat(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Button onClick={() => {
                                if (validAmount) {
                                    const address = Cookies.get("address")
                                    const ethAmount = parseFloat(localStorage.getItem(address))
                                    const balance = ethAmount + amountTypedIn
                                    localStorage.setItem(address, balance)
                                    handleMintClose()
                                    setOperation("minting")
                                    setAlert(true)
                                }
                            }} >MINT</Button>
                        </div>
                    </div>
                </Fade>

            </Modal>
            <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="success" onClose={handleClose}>
                    Successful {operation}!
                </Alert>
            </Snackbar>
        </div>
    )
}