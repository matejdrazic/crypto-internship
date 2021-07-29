import SnackbarM from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snackbar = (props) => {
    return (
        <SnackbarM open={props.open} autoHideDuration={2000} onClose={props.onClose}>
            <Alert severity={props.severity} onClose={props.onClose}>
                {props.severity === "success" ? `Successful ${props.operation}!` : "Something is wrong!" } 
            </Alert>
        </SnackbarM>
    )
}

export default Snackbar