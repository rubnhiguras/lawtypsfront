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
import './User.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const defaultusername: string = "'Persona Misteriosa'";
let userlogged: string;
let urlProfile: string;
let settingsTooltip: string = "Espacio personal";

function LoggedBarPage(props: any) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [avatarDialog, setAvatarDialog] = React.useState(false); 
    const [closeSessionDialog, setCloseSessionDialog] = React.useState(false); 
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

    function logoutsession(){
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

    const handleChangePage = (
       page: string
    ) => {
        if(page === '/User/setlogout/'){
            showCloseSessionDialog();
        }else{
            handlePage(page);
        } 
    }

    const pages = [
        {   name: 'Inicio', site: "/Home/", tooltip: "Bienvenida" },
        {   name: 'Casos', site: "/User/casos/", tooltip: "Página de casos (abogados)" },
        {   name: 'Abogados', site: "/User/abogados/", tooltip: "Página de abogados (clientes)"  }
    ];

    const settings = [
        { site: '/User/', name: `${userlogged}`,  tooltip: `Configuración y datos de ${userlogged}` },
        { site: '/User/setfactur/', name: 'Facturación', tooltip: "Página de facturación (abogados & clientes)"  },
        { site: '/User/setclient/', name: 'Clientes', tooltip: "Página de clientes (abogados)"  },
        { site: '/User/setprecio/', name: 'Precios', tooltip: "Página de precios (abogados)"  },
        { site: '/User/setabogad/', name: 'Abogados', tooltip: "Página de abogados (clientes)"  },
        { site: '/User/setlogout/', name: 'Log out', tooltip: "Cerras sesión"  }
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
        window.location.href = path; 
    }

    function selectedPage(param: string): boolean{
        const fullPath = window.location.pathname; 
        return fullPath === param; 
    }

    userlogged = props.username ? userLoggedTrim(props.username) : userlogged;
    urlProfile = props.urlProfile ? props.urlProfile : urlProfile;

    function showAvatar(): void { 
        setAvatarDialog(true);
    }

    function hideAvatar(): void { 
        setAvatarDialog(false);
    }

    function showCloseSessionDialog(): void { 
        setCloseSessionDialog(true);
    }

    function hideCloseSessionDialog(): void { 
        setCloseSessionDialog(false);
    }

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
                                <MenuItem key={page.name} onClick={(e) => {e.target; handlePage(page.site)}} selected={selectedPage(page.site)}>
                                    <Typography textAlign="inherit" sx={{
                                        ":hover": { color: '#6b9080' }
                                    }} >{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box id="mainnavbar" sx={{ flexGrow: 1, display: { xs: 'none', md: 'inline-flex' } }} >
                        {pages.map((page) => (
                            <Tooltip title={page.tooltip} key={page.tooltip}>
                                <MenuItem key={page.name} onClick={(e) => {e.target; handlePage(page.site)}} selected={selectedPage(page.site)}
                                sx={{border:'solid transparent 0.2rem', ":hover": {border:'solid 0.2rem ', borderRadius: 20} }} 
                                >
                                    <Typography textAlign="inherit"  
                                    sx={{ my: 0, color: 'white', fontSize: 22 }} 
                                    >{page.name}</Typography>
                                </MenuItem>
                            </Tooltip>  
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={settingsTooltip} >
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userlogged} src={urlProfile} />
                            </IconButton>
                        </Tooltip>

                        <Dialog
                            open={avatarDialog}
                            onClose={hideAvatar}
                        > 
                            <DialogTitle id="avatar-dialog-title">
                                {userlogged}
                            </DialogTitle>
                            <DialogContent id="avatar-dialog-content">
                                <Avatar alt={userlogged} src={urlProfile} variant="rounded" sx={{ width: 550, height: 550 }}/>
                            </DialogContent>
                        </Dialog>

                        <Dialog
                            open={closeSessionDialog}
                            onClose={hideCloseSessionDialog}
                        > 
                            <DialogTitle id="avatar-dialog-title">
                                Cerrando sesión...
                            </DialogTitle>
                            <DialogContent id="avatar-dialog-content">
                                Se va a cerrar la sesión.
                            </DialogContent>
                            <DialogActions>
                                <Button sx={{color: "red"}} onClick={hideCloseSessionDialog} autoFocus>Mejor no, cancelar</Button>
                                <Button sx={{color: "#6b9080"}} onClick={logoutsession}>Si, cerrar sesión</Button>
                            </DialogActions>
                        </Dialog>

                        <Menu
                            sx={{ mt: '45px', marginTop:-2}}
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
                            <MenuItem key={userlogged} onClick={showAvatar}>
                                <Avatar alt={userlogged} src={urlProfile} variant="circular" sx={{ width: 111, height: 111 }}/>
                            </MenuItem>
                            {settings.map((setting) => (
                                <Tooltip key={setting.tooltip} title={setting.tooltip}>
                                    <MenuItem key={setting.name} onClick={(event) => {event.target; handleChangePage(setting.site);}} sx={{
                                        ":hover": { color: "#6b9080" }, p: 2
                                    }} selected={selectedPage(setting.site)}>
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
