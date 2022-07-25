import naber_css from "../styles/navbar.module.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';


export default function Navbar() {
  const [toggle,setToggle]=useState(false);

  const toggleDrawer =(open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
    event.type === 'keydown' &&
    (
        (event as React.KeyboardEvent).key === 'Tab' ||(event as React.KeyboardEvent).key === 'Shift')
    ) {
        return;
    }
    setToggle(open);
  };
  function DrawrList():JSX.Element{
    return(
        <Box
        sx={{width:250}}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem disablePadding>
                        <Link href='/'>
                            <ListItemButton>
                              <ListItemText primary={"메인페이지"} />
                            </ListItemButton>
                        </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href='/home'>
                        <ListItemButton>
                          <ListItemText primary={"홈"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </Box>
    );
  }
  
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0} style={{backgroundColor:"#F6F6F6"}}>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="default"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
            >
            <MenuIcon style={{color:"rgb(34, 40, 49)"}}/>
            </IconButton>
            </Toolbar>
        </AppBar>
        </Box>
        <Drawer
            anchor='left'
            open={toggle}
            onClose={toggleDrawer(false)}
          >
        <DrawrList/>
        </Drawer>
    </div>
  );
}






