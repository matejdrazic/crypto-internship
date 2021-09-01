import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import Cookies from 'js-cookie'
import styles from '../../styles/Home.module.css'
import Box from '@material-ui/core/Box'

const Card = (props) => {

    return (
        <Box component="div" onClick={props.onClick} className={styles.card}>
            <div>
                <div></div>
                <Box component="div" display="inline" className={styles.right} >
                    {!props.icon ? <TransferWithinAStationIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                </Box>
            </div>
            <p>
                {props.title}
            </p>
            <p>
                {props.balance === 0 ? '' : props.balance} {props.tokenSymbol ? props.tokenSymbol : "Token Not Selected"}
            </p>
        </Box>
    )
}

export default Card