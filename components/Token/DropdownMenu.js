import React, { useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { makeStyles } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Token from '../../contracts_cf/build/contracts/Token.json'
import getNames from '../Database/TokenNames.js'
import getAddress from '../Database/TokenAddress.js'
import { signerProvider } from './provider'
import { useRouter } from 'next/router'
import { useWeb3Context } from 'web3-react'
import { ethers } from 'ethers'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 13,
    color: purple[500],
  },
  button: {
    border: "2px solid #eaeaea",
    borderRadius: '7px',
    color: '#EA03BB',
    '&:hover': {
      color: "#AA01FA",
      borderColor: "#AA01FA",
    },
  },
  item: {
    border: "2px solid #eaeaea",
    borderRadius: "5px",
    '&:hover': {
      color: "#AA01FA",
      borderColor: "#AA01FA",
    },
  },
  list: {
    borderRadius: "5px"
  }
}));

export default function MenuListComposition(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [selected, setSelected] = useState('select')
  const [names, setNames] = useState(null)
  const [signer, setSigner] = useState(null)
  const router = useRouter()
  const context = useWeb3Context()

  useEffect(async () => {

    const namesTemp = await getNames(context.account.toLowerCase())
    namesTemp.length == 0 ? setSelected('select') : null
    setNames(namesTemp)
    props.setTokenContract(null)
    props.setTokenSymbol(null)
    props.setBalance(0)

    let provider = new ethers.providers.Web3Provider(window.ethereum)

    setSigner(provider.getSigner())

  }, [context.account])

  const handleToggle = () => {
    names.length == 0 ? noTokens() : setOpen((prevOpen) => !prevOpen)
  }

  const noTokens = () => {
    props.setHasTokens(true)
    setTimeout(() => {
      props.setHasTokens(false)
      router.push('/createatoken')
    }, 3000)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;

  }, [open]);


  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={() => { context.account ? handleToggle() : null }}
          startIcon={open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          style={{ width: '120px' }}
          variant="outlined"
          className={classes.button}
        >
          {selected}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList className={classes.list} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                    {names.map((tokenName, index) => {
                      return (
                        <MenuItem className={classes.item} onClick={async () => {
                          setSelected(tokenName)
                          const address = await getAddress(tokenName)
                          const tokenContract = new ethers.Contract(address, Token.abi, signer)
                          props.setTokenContract(tokenContract)
                          tokenContract.symbol().then(symbol => { props.setTokenSymbol(symbol) })
                          tokenContract.balanceOf(context.account).then(balance => {
                            let balanceEther = ethers.utils.formatEther(balance)
                            props.setBalance(parseFloat(balanceEther))
                          })

                          setOpen(false)
                        }} key={index}>{tokenName}</MenuItem>
                      )
                    })}

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}