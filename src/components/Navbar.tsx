import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import Vehicles from './vehicle/Vehicles';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/users/userSlice';

function Navbar() {
  
  const dispatch = useDispatch<AppDispatch>();
  
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/login");
    window.location.reload();
  };


  return (
    <AppBar position="static" sx={{padding: 3}}>
        <Toolbar disableGutters>
          <NoCrashIcon sx={{ fontSize: 50,  display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontSize: 25,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Rent-A-Car
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex', justifyContent: 'flex-end' } }}>
            <Link to="/vehicles">
              <Button
                sx={{
                 my: 2,
                 color: 'white',
                 display: 'block',
                 fontWeight: 700,
                 fontSize: 17,
                 textDecoration: 'none'
                }}
              >Vehicles
              </Button>
        </Link>  
        <Link to="/contact">
              <Button
                sx={{
                 my: 2,
                 color: 'white',
                 display: 'block',
                 fontWeight: 700,
                 fontSize: 17,
                 textDecoration: 'none'
                }}
              >Contact
              </Button>
        </Link>  
        <Link to="/about">
              <Button
                sx={{
                 my: 2,
                 color: 'white',
                 display: 'block',
                 fontWeight: 700,
                 fontSize: 17,
                 textDecoration: 'none'
                }}
              >About
              </Button>
        </Link>
        {!token ? (<Link to="/register">
              <Button
                sx={{
                 my: 2,
                 color: 'white',
                 display: 'block',
                 fontWeight: 700,
                 fontSize: 17,
                 textDecoration: 'none'
                }}
              >Register
              </Button>
        </Link>) : null}
        
        {!token ? (<Link to="/login">
              <Button
                sx={{
                 my: 2,
                 color: 'white',
                 display: 'block',
                 fontWeight: 700,
                 fontSize: 17,
                 textDecoration: 'none'
                }}
              >Login
              </Button>
        </Link>) : null }

        {token ? (<Link to="/userProfile">
              <Button
                sx={{
                 my: 2,
                 color: 'white',
                 display: 'block',
                 fontWeight: 700,
                 fontSize: 17,
                 textDecoration: 'none'
                }}
              >User Profile
              </Button>
        </Link>) : null }        

        {token ? (<Link to="/login">
              <Button
                sx={{
                 my: 2,
                 color: 'white',
                 display: 'block',
                 fontWeight: 700,
                 fontSize: 17,
                 textDecoration: 'none'
                }} onClick={handleLogOut}
              >Log-out
              </Button>
        </Link>) : null }


          </Box>
        </Toolbar>
    </AppBar>
  );
}
export default Navbar;

