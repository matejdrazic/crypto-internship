import React from 'react'
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
import Token from '../../contracts_cf/build/contracts/Token.json'
import web3 from './web3'
import contract from './CoinFactory.js'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 13,
    color: purple[500],
  },

}));

export default function MenuListComposition(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
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
          onClick={handleToggle}
          startIcon={<ArrowDropDownIcon />}
          variant="outlined"
          color="inherit"
        >
          Select Token
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                    {props.names.map((tokenName, index) => {
                      return (
                        <MenuItem onClick={async () => {
                          await contract.methods.tokensCreated(tokenName).call({ from: ethereum.selectedAddress }).then(async (address) => {
                            const tokCon = new web3.eth.Contract(Token.abi, address)
                            props.setTokenContract(tokCon)
                            await tokCon.methods.symbol().call({ from: ethereum.selectedAddress }).then(symbol => { props.setTokenSymbol(symbol) })
                            await tokCon.methods.balanceOf(ethereum.selectedAddress).call({ from: ethereum.selectedAddress }).then(balance => {
                              let balanceEther = web3.utils.fromWei(balance, 'ether')
                              props.setBalance(parseFloat(balanceEther))
                            })
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