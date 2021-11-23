import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation } from 'react-router-dom';


export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser(store);
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = loggedOutMenu;
    let userIcon = <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        { getAccountMenu(auth.loggedIn) }
                    </IconButton>;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        let initials = auth.user.firstName[0] + auth.user.lastName[0];
        userIcon = <Typography
                        variant = "h4"
                        nowrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'} }}
                        onClick={handleProfileMenuOpen}
                    >
                        {initials}
                    </Typography>;
    }
    let component = "";
    const location = useLocation();
    if(location.pathname !== "/") {
        component = <Box sx={{ flexGrow: 1}}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography                        
                                    variant="h4"
                                    noWrap
                                    component="div"
                                    sx={{ display: { xs: 'none', sm: 'block' } }}                        
                                >
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>T<sup>5</sup>L</Link>
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    {userIcon}
                                </Box>
                            </Toolbar>
                        </AppBar>
                        {
                            menu
                        }
                    </Box>
    }

    function getAccountMenu(loggedIn) {
        return <AccountCircle />;
    }

    return (
        component
    );
}