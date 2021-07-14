import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import Cookies from 'js-cookie'
import styles from '../styles/Home.module.css'
import Box from '@material-ui/core/Box'

const Style = "text-white text-xs"

const Card = (props) => {
    const balance = localStorage.getItem(Cookies.get("address"))

    return (
        <Box component="div" onClick={props.onClick} className={styles.card}>
            <div>
                <div></div>
                <Box component="div" display="inline" className={styles.right} >
                    {!props.icon ? <TransferWithinAStationIcon fontSize="small" className={Style} /> : <AddIcon fontSize="small" className={Style} />}
                </Box>
            </div>
            <p>
                {props.title}
            </p>
            <p>
                {balance} ETH
            </p>
        </Box>
    )
}

export default Card