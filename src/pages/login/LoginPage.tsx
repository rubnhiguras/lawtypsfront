import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import Button from '@mui/material/Button'; 
import { Backdrop, Box, Card, CardActions, CardContent, CircularProgress, FormControl, TextField } from '@mui/material';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'; 
import { firebaseAuth } from '../../services/Firebase/FirebaseService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User  
      // ... 
      navigate("/user")
    } else {
      // User is signed out
      // ...
    }
  }); 

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    // Después de la autenticación exitosa, redirige al usuario a la página de inicio
    setOpen(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    }).finally(()=>{setOpen(false);});
    
  };

  const handleBack = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    navigate('/');
  };

  const handleRegister = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    navigate('/Register');
  };

  return (
    <Card sx={{ marginTop: 20, minWidth: 200, borderRadius: "40px" }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CardContent>
        <h2>Login</h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl component="form" sx={{ '& > :not(style)': { m: 1, width: '35ch' }, }}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <div>
              <TextField id="Email-basic" label="Username/Email" variant="standard" type="email" value={email} onChange={(e) => (setEmail(e.target.value))} />
            </div>

            <div>
              <TextField id="Password-basic" label="Password" variant="standard" type="password" value={password} onChange={(e) => (setPassword(e.target.value))} />
            </div>

            <CardActions className='button-section'>
              <Button variant="contained" onClick={handleLogin} type='submit' color="success" className='button-section-element'  >Log in  </Button>
              <Button variant="contained" onClick={handleBack} color="error" className='button-section-element' >Back    </Button>
              <Button variant="contained" onClick={handleRegister} color="secondary" className='button-section-element' >Register</Button>
            </CardActions>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
