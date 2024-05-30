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
import React from 'react';
import { USERS_TYPS, firebaseAuth } from '../../services/Firebase/FirebaseService';  
import './User.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function LoggedBarPage(props: any) {
    const defaultusername: string = "'Persona Misteriosa'";
    const settingsTooltip: string = "Espacio personal";
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [avatarDialog, setAvatarDialog] = React.useState(false); 
    const [closeSessionDialog, setCloseSessionDialog] = React.useState(false); 
    
    let userlogged: string;
    let urlProfile: string;
    let userArt: string;

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

    userlogged = props.username ? userLoggedTrim(props.username) : '';
    urlProfile = props.urlProfile ? props.urlProfile : '';
    userArt    = props.userArt ? props.userArt : '';

    const pages: Pages[] = [
        { typeuser: USERS_TYPS.ALL, name: 'Inicio', site: "/Home/", tooltip: "Bienvenida" },
        { typeuser: USERS_TYPS.ABO, name: 'Casos', site: "/User/casos/", tooltip: "Página de casos" },
        { typeuser: USERS_TYPS.CLI, name: 'Abogados', site: "/User/abogados/", tooltip: "Página de abogados" }
    ];

    const settings: Pages[] = [
        { typeuser: USERS_TYPS.ALL, name: `${userlogged}`, site: '/User/', tooltip: `Configuración y datos de ${userlogged}` },
        { typeuser: USERS_TYPS.ABO, name: 'Facturación', site: '/User/setfactur/', tooltip: "Página de facturación" },
        { typeuser: USERS_TYPS.CLI, name: 'Pagos', site: '/User/setpagos/', tooltip: "Página de pagos" },
        { typeuser: USERS_TYPS.ABO, name: 'Clientes', site: '/User/setclient/', tooltip: "Página de clientes" },
        { typeuser: USERS_TYPS.ABO, name: 'Precios', site: '/User/setprecio/', tooltip: "Página de precios" },
        { typeuser: USERS_TYPS.CLI, name: 'Abogados', site: '/User/setabogad/', tooltip: "Página de abogados" },
        { typeuser: USERS_TYPS.ADM, name: 'Nuevo usuario', site: '/Register', tooltip: "Página de creación de nuevo usuario" },
        { typeuser: USERS_TYPS.ALL, name: 'Log out', site: '/User/setlogout/', tooltip: "Cerras sesión" }
    ];

    function verifyPath(path: string): boolean { 
        let isValid = false;
        pages.map((page) => {
            if(!isValid){ 
                isValid = validation(path, page);
            }
        });
        if(!isValid){
            settings.map((page) => {
                if(!isValid){
                    isValid = validation(path, page);
                }
            });
        }   
        return isValid;
        //if(USERS_TYPS.ALL === setting.typeuser || userArt === setting.typeuser.value)
    }

    function validation(path: string, page: Pages) {
        return path === page.site && (userArt === page.typeuser.value || USERS_TYPS.ALL === page.typeuser);
    } 

    function logoutsession(){
        signOut(firebaseAuth).then(() => {
            // Sign-out successful. 
            window.location.href = '/Home/';
            console.info(event, "Signed out successfully");
        }).catch((error) => {
            // An error occurred.
            console.error(error, "Signed out with error"); 
        });
    }

    const handleChangePage = (
       site: string
    ) => {
        if(site === '/User/setlogout/'){
            showCloseSessionDialog();
        }else{
            handlePage(site);
        } 
    }

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

    const handlePage = (site: string) => {
        window.location.href = site; 
    }

    function selectedPage(param: string): boolean{
        const fullPath = window.location.pathname; 
        return fullPath === param; 
    }

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

    function generateMenuItem(setting: Pages): any {

        if(USERS_TYPS.ALL === setting.typeuser || userArt === setting.typeuser.value){

            return (
                <Tooltip key={setting.tooltip} title={setting.tooltip} >
                    <MenuItem key={setting.name} onClick={(event) => {event.target; handleChangePage(setting.site);}} sx={{
                        ":hover": { color: "#6b9080" }, p: 2
                    }} selected={selectedPage(setting.site)}>
                        <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                </Tooltip>  
            );
        } else {
            return (<i></i>);
        }
    }

    function generatePageItem(page: Pages): any {

        if(USERS_TYPS.ALL === page.typeuser || userArt === page.typeuser.value){
            return (
                <Tooltip title={page.tooltip} key={page.tooltip}>
                    <MenuItem key={page.name} onClick={(e) => {e.target; handlePage(page.site)}} selected={selectedPage(page.site)}
                    sx={{border:'solid transparent 0.2rem', ":hover": {border:'solid 0.2rem ', borderRadius: 20} }} 
                    >
                        <Typography textAlign="inherit"  
                        sx={{ my: 0, color: 'white', fontSize: 22 }} 
                        >{page.name}</Typography>
                    </MenuItem>
                </Tooltip>  
            );
        } else {
            return (<i></i>);
        }
    }

    function verifyAndRedirect(): any{
        if(userArt?.length > 0){
            if(!verifyPath(window.location.pathname)){
                window.location.href = '/forbidden';
            }
        }
    }

    return (
        
        <AppBar position="static" sx={{ bgcolor: "#6b9080", borderRadius: "40px" }}>
            {verifyAndRedirect()}
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
                        {pages.map((page) => generatePageItem(page))} 
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
                            {settings.map((setting) => generateMenuItem(setting))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export interface Pages{
    typeuser: { value: string; };
    name: string;
    site: string;
    tooltip: string;
}

export default LoggedBarPage
