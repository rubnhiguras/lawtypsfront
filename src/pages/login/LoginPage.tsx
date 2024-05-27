import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import Button from '@mui/material/Button';
import { Alert, Backdrop, Box, Card, CardActions, CardContent, CircularProgress, FormControl, TextField, Tooltip } from '@mui/material';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../services/Firebase/FirebaseService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import packageJson from '../../../package.json';

const LoginPage: React.FC = () => {

  document.title = document.title = packageJson.title + ' ' + 'Login';

  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User 
      window.location.href = './User';
      //navigate("/user");
    } else {
      // User is signed out
      // ...
    }
  });

  const onKeyDown = (e: { key: string; }) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    // Después de la autenticación exitosa, redirige al usuario a la página de inicio
    setOpen(true);
    if (email && password) {
      checkLogInfo().finally(() => setOpen(false));
    }
  };

  const checkLogInfo = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (errorLaunched) {
      setError("Error en el login: " + errorLaunched);
    }
  }
  const handleBack = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    //navigate('/');
    window.location.href = './Home';
  };

  function CustomErrorAlert() {
    if (error.length > 0) {
      return <Alert severity="error" >{error}</Alert>;
    } else {
      return <p></p>;
    }

  }

  return (
    <Card id="logincard" sx={{ marginTop: 0.4, minWidth: 100, borderRadius: "40px" }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CardContent>
        <h2>Login</h2>
        <Box sx={{ minWidth: 99 }}>

          <FormControl component="form" sx={{ '& > :not(style)': { m: 0.4, width: '28ch' }, }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField id="Email-basic" label="Username/Email" variant="standard" type="email" value={email} onChange={(e) => (setEmail(e.target.value))}
                onKeyDown={onKeyDown} />
            </div>

            <div>
              <TextField id="Password-basic" label="Password" variant="standard" type="password" value={password} onChange={(e) => (setPassword(e.target.value))}
                onKeyDown={onKeyDown} />
            </div>
            <CustomErrorAlert></CustomErrorAlert>
            <CardActions className='button-section'>
              <Tooltip title="Volver">
                <Button variant="contained" onClick={handleBack} color="info" className='button-section-element' startIcon={<ArrowBackIcon />} />
              </Tooltip>
              <Tooltip title="Iniciar sesión">
                <Button variant="contained" onClick={handleLogin} onSubmit={handleLogin} color="success" className='button-section-element' startIcon={<LoginIcon />} />
              </Tooltip>
            </CardActions>
            <div>
              ¿Esto es nuevo? <br /><a href='./Register'>Crear una cuenta</a>
            </div>
          </FormControl>

        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
