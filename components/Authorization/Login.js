import React, { useEffect, useState } from 'react'
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
import web3 from '../Token/web3.js'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import router from 'next/router'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 5),
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

export default function Login(props) {
    const classes = useStyles()
    const router = useRouter()
    const [validAddress, setValidAddress] = useState(false)
    const [ethAddress, setEthAddress] = useState("")
    const [metamask, setMetamask] = useState(false)
    const [load, setLoad] = useState(false)

    const handleConnect = async () => {
        const address = await ethereum.request({ method: 'eth_requestAccounts' })
        const chainId = await ethereum.request({ method: 'eth_chainId' });

        if (address && chainId == '0x3') router.push('/dashboard')
    }

    setTimeout(() => {
        setLoad(true)
    }, 1000)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMetamask(false)
    };

    useEffect(() => {
        window.ethereum ? (ethereum.selectedAddress ? props.setAddress(true) : props.setAddress(false)) : null
    })

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
                        <ColorButton
                            fullWidth
                            variant="outlined"
                            color={classes.bgColor}
                            className={classes.submit}
                            onClick={() => {
                                if (window.ethereum) {
                                    if (ethereum.selectedAddress) {
                                        router.push('/dashboard')
                                    } else {
                                        handleConnect()
                                    }
                                } else {
                                    setMetamask(true)
                                }
                            }}
                        >
                            <b>Connect Wallet</b>
                        </ColorButton>
                    </form>
                </div>
            </div> : ""}

            <Snackbar open={metamask} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>
                    Metamask not detected!
                </Alert>
            </Snackbar>

        </Container>
    );
}