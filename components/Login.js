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

export default function Login() {
    const classes = useStyles()
    const router = useRouter()
    const [validAddress, setValidAddress] = useState(false)
    const [ethAddress, setEthAddress] = useState(0)

    return (
        <Container component="main" maxWidth="xs">
            <Head>
                <title>Crypto internship</title>
                <link rel="icon" href="/token.png" />
            </Head>
            <CssBaseline />
            <div className={classes.paper}>
                <Image src="/logo.png" alt="logo" width="400px" height="270px" />
                <Typography component="h1" variant="h5">
                    createatoken.xyz
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
                        helperText={validAddress ? "Address looks good" : "Please enter valid ethereum address"}
                        error={!validAddress}
                        onChange={(e) => {
                            setEthAddress(e.target.value)
                            e.target.value.length === 42 ? setValidAddress(true) : setValidAddress(false)
                        }}
                    />
                    <ColorButton
                        fullWidth
                        variant="outlined"
                        color={classes.bgColor}
                        className={classes.submit}
                        onClick={() => {
                            if (validAddress) {
                                Cookies.set('address', ethAddress, { expires: 1 / 24 })
                                if (!localStorage.getItem(ethAddress)) {
                                    localStorage.setItem(ethAddress, 0)
                                }
                                router.push("/dashboard")
                            } else {

                            }
                        }}
                    >
                        <b>Login</b>
                    </ColorButton>
                </form>
            </div>
        </Container>
    );
}