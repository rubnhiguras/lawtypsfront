import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar'; 
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem'; 
import { signOut } from 'firebase/auth';
//import { useNavigate } from 'react-router-dom';
import React from 'react';
import { firebaseAuth } from '../../services/Firebase/FirebaseService';  

const defaultusername: string = "'Persona Misteriosa'";
let userlogged: string;
let urlProfile: string;
let settingsTooltip: string = "Espacio personal";

function LoggedBarPage(props: any) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    //const navigate = useNavigate();

    const userLoggedTrim = (username: string) => {
        let result = username;
        const userloggedLength = defaultusername.length;
        let resultLength = result.length;
        let diff = userloggedLength - resultLength;
        if (diff > 0) {
            while (diff > 0) {
                result = result + ' ';
                resultLength = result.length;
                diff = userloggedLength - resultLength;
            }
        } else if (diff < 0) {
            result = result.substring(0, userloggedLength - (-diff)) + '...';
        }
        return result;
    }

    const handleSingout = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        signOut(firebaseAuth).then(() => {
            // Sign-out successful. 
            window.location.href = '/Home';
            console.log(event, "Signed out successfully");
        }).catch((error) => {
            console.log(event, "Signed out with error");
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
        { name: 'Inicio', site: "/Home", tooltip: "Bienvenida" },
        { name: 'Casos', site: "/Login", tooltip: "Página de casos (abogados)" },
        { name: 'Abogados', site: "/Login", tooltip: "Página de abogados (clientes)"  }
    ];

    const settings = [
        { name: `${userlogged}`, action: handleNothing, tooltip: `Configuración y datos de ${userlogged}` },
        { name: 'Facturación', action: handleNothing, tooltip: "Página de facturación (abogados & clientes)"  },
        { name: 'Clientes', action: handleNothing, tooltip: "Página de clientes (abogados)"  },
        { name: 'Precios', action: handleNothing, tooltip: "Página de precios (abogados)"  },
        { name: 'Abogados', action: handleNothing, tooltip: "Página de abogados (clientes)"  },
        { name: 'Log out', action: handleSingout, tooltip: "Cerras sesión"  }
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

    const handlePage = (path: string) => {
        if(path == '/Home'){
            window.location.href = path;
        }else{
            //TODO change content in loggedContentPage
        }
    }



    userlogged = props.username ? userLoggedTrim(props.username) : userlogged;
    urlProfile = props.urlProfile ? props.urlProfile : urlProfile;

    return (
        <AppBar position="static" sx={{ bgcolor: "#6b9080", borderRadius: "40px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                                <MenuItem key={page.name} onClick={(e) => {console.log(e); handlePage(page.site)}}>
                                    <Typography textAlign="inherit" sx={{
                                        ":hover": { color: "#6b9080" }
                                    }} >{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Tooltip title={page.tooltip}>
                                <IconButton
                                key={page.name}
                                onClick={(e) => {console.log(e); handlePage(page.site)}}
                                sx={{ my: 0, color: 'white', display: 'inline', ":hover": { color: "#ffccbc" } }}
                            >
                                {page.name}
                            </IconButton>
                            </Tooltip>  
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={settingsTooltip}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userlogged} src={urlProfile} />
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
                                <Tooltip title={setting.tooltip}>
                                    <MenuItem key={setting.name} onClick={(event) => setting.action(event)} sx={{
                                        ":hover": { color: "#6b9080" }, p: 2
                                    }} >
                                        <Typography textAlign="center">{setting.name}</Typography>
                                    </MenuItem>
                                </Tooltip>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default LoggedBarPage
