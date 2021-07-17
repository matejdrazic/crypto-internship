import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Cookies from 'js-cookie'
import { green, purple } from '@material-ui/core/colors'
import Image from 'next/image'
import Web3 from 'web3'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    bgColor: {
        background_color: purple[500]
    }
}));

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
    const classes = useStyles()
    const router = useRouter()
    const [validAddress, setValidAddress] = useState(false)
    const [ethAddress, setEthAddress] = useState("")
    const [load, setLoad] = useState(false)
    const [alert, setAlert] = useState(false);

    setTimeout(() => {
        setLoad(true)
    }, 1000)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Head>
                <title>Crypto internship</title>
                <link rel="icon" href="/token.png" />
            </Head>
            {load ? <div><CssBaseline />
                <div className={classes.paper}>
                    <Image src="/logo.png" alt="logo" width="400px" height="270px" />
                    <Typography component="h1" variant="h5">
                        <h2 className="textNunito textSize">createatoken.xyz</h2>
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="ethAddress"
                            label="Ethereum Address"
                            name="ethAddress"
                            onChange={(e) => {
                                setEthAddress(e.target.value)
                            }}
                        />
                        <ColorButton
                            fullWidth
                            variant="outlined"
                            color={classes.bgColor}
                            className={classes.submit}
                            onClick={() => {
                                if (web3.utils.isAddress(ethAddress)) {
                                    Cookies.set('address', ethAddress, { expires: 1 / 24 })
                                    if (!localStorage.getItem(ethAddress)) {
                                        localStorage.setItem(ethAddress, 0)
                                    }
                                    router.push("/dashboard")

                                } else {
                                    setAlert(true)
                                }
                            }}
                        >
                            <b>Login</b>
                        </ColorButton>
                    </form>
                </div>
            </div> : ""}

            <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>
                    Address invalid!
                </Alert>
            </Snackbar>

        </Container>
    );
}