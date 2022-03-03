import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExploreIcon from '@material-ui/icons/Explore';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { useRouter } from 'next/router'


export default function Menu() {

    const [openMenu, isOpenMenu] = useState(false)
    const router = useRouter()

    return (
        <>
            <Drawer
                anchor='left' onClose={() => { isOpenMenu(false) }} open={openMenu}>
                <List>
                    <div className='cursor'>
                        <ListItem onClick={() => { router.push('/dashboard') }} >
                            <ListItemAvatar>
                                <Avatar>
                                    <DashboardIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </div>
                    
                    <div className='cursor'>
                        <ListItem onClick={() => { router.push('/explore') }} >
                            <ListItemAvatar>
                                <Avatar>
                                    <ExploreIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Explore" />
                        </ListItem>
                    </div>

                    <div className='cursor'>
                        <ListItem onClick={() => { router.push('/createatoken') }} >
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Create a Token" />
                        </ListItem>
                    </div>

                    <div className='cursor'>
                        <ListItem onClick={() => { router.push('/about') }} >
                            <ListItemAvatar>
                                <Avatar>
                                    <InfoIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="About" />
                        </ListItem>
                    </div>

                </List>
            </Drawer>

            <IconButton onClick={() => { isOpenMenu(!openMenu) }} >
                <MenuIcon />
            </IconButton>
        </>
    );
}