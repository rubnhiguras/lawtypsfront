import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';  
import { Fingerprint } from '@mui/icons-material';
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom'; 
import React from 'react';
import { firebaseAuth, firebaseDatabase } from '../../services/Firebase/FirebaseService';
import { collection, doc, getDoc } from 'firebase/firestore';
import { Backdrop, CircularProgress } from '@mui/material';

let userlogged: string = "'Persona Misteriosa'"; 
let urlProfile: string = "https://i.seadn.io/gae/Ihufw_BbfNUhFBD-XF74FlY2JjpYeUkkTdhzJy_bjEdfz0qKlLMOkxlUKxyJR7ib5dgsji9XZAMuorSX20Fw12q5XZ2LJTj2efcS?auto=format&dpr=1&w=1000"; 

function LoggedBarPage(props: any){
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    userlogged = props.username ? props.username : userlogged;
    urlProfile = props.urlProfile ? props.urlProfile : urlProfile;

    const handleSingout = (
        event: React.MouseEvent<HTMLElement> 
      ) => {
        console.log(event);
        signOut(firebaseAuth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully");
        }).catch((error) => {
            console.log("Signed out with error");
            console.log(error);
        // An error happened.
        });
    }

    const handleNothing = (
        event: React.MouseEvent<HTMLElement> 
      ) => {
        console.log(event);
    }

    const pages = [
        {name:'Casos', site:"/login"},
        {name:'Precios', site:"/login"}];

    const settings = [
        {name:'Perfil', action: handleNothing}, 
        {name:'Facturación', action: handleNothing},
        {name:'Log out', action: handleSingout}
    ];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: "#6b9080", borderRadius: "40px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Fingerprint sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none',
                            ":hover": { color: "#ffccbc" }
                        }}
                    >
                        Hola, {userlogged}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" sx={{
                                        ":hover": { color: "#6b9080" }
                                    }} >{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft: '55%' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', ":hover": { color: "#ffccbc" }}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={urlProfile} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={(event) => setting.action(event)} sx={{
                                    ":hover": { color: "#6b9080" }
                                }} >
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar> 
    );
}

export default LoggedBarPage
