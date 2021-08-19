import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import getJoke from './Jokes.js';

export default function JokeDialog() {
    const [open, setOpen] = React.useState(true)
    const [joke, setJoke] = React.useState(null)

    useEffect(() => {
        gettingJoke()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const gettingJoke = async () => {
        const joke = await getJoke()
        setJoke(joke)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><b>{"Maybe a joke while you wait?"}</b></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {joke}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={gettingJoke} color="primary" autoFocus>
                        Get a new joke!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}