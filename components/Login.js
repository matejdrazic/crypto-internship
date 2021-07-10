import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles()
    const router = useRouter()
    const [ethAddress, setEthAddress] = useState(0)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src="../logo.png" width="400px" height="270px" />
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
                        autoFocus
                        helperText="Please enter valid ethereum address"
                        error={ethAddress.length === 42 ? false : true}
                        onChange={(e) => {
                            e.preventDefault()
                            setEthAddress(e.target.value)
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            if (ethAddress.length === 42) {
                                Cookies.set('address', ethAddress, { expires: 1 / 24 })
                                router.push("/dashboard")
                            } else {
                                
                            }
                        }}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    );
}