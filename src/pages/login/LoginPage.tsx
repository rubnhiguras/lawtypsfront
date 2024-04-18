import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'
import Button from '@mui/material/Button'; 
import { Box, Card, CardActions, CardContent, FormControl, TextField } from '@mui/material';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'; 
import { firebaseAuth } from '../../services/Firebase/FirebaseService';

export let logged = false;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      console.log("uid", uid)
      logged = true;
      navigate("/user")
    } else {
      // User is signed out
      // ...
      console.log("user is logged out")
      logged = false; 
    }
  }); 

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    // Después de la autenticación exitosa, redirige al usuario a la página de inicio
    signInWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/user")
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
    
    logged = true;
    navigate('/User');
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
