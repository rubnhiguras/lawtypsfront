import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'
import { Box, Button, Card, CardActions, CardContent, FormControl, MenuItem, TextField } from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseAuth, firebaseDatabase } from '../../services/Firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { UserModel } from '../../services/UserModel/UserModel';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const registerAction = async (emailP: string, nameP: string, passwordP: string, roleP: string) => {
    try {
      console.log("> Registering user")
      //setLoading(true);
      const {
        user
      } = await createUserWithEmailAndPassword(firebaseAuth, emailP, passwordP)
  
      console.log("> Updating profile")
      await updateProfile(user, {
        displayName: name,
      });
      const userData: UserModel = new UserModel(
        nameP,
        emailP,
        roleP,
        user.uid
      );
      const usersCollection = collection(firebaseDatabase, 'users');
      const documentAddedRef = await addDoc(usersCollection, {...userData});
      console.log(documentAddedRef); 
      
      window.location.pathname = `/login`;
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogin = async () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    // Después de la autenticación exitosa, redirige al usuario a la página de inicio

    if (email && name && password && role) {
      const {
        user
      } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      
      const userData: UserModel = new UserModel(
        name,
        email,
        role,
        user.uid
      );
      const usersCollection = collection(firebaseDatabase, 'users');
      const documentAddedRef = await addDoc(usersCollection, {...userData});
      console.log(documentAddedRef);
    };

     
      //setLoading(false)
  };

  const handleBack = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    navigate('/Login');
  };

  const handleCancel = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    navigate('/');
  };

  const roles = [
    { name: 'Abogado', code: 'LW' },
    { name: 'Cliente', code: 'CL' },
    { name: 'Administrador', code: 'AD' }
  ];

  return (
    <Card sx={{ marginTop: 20, minWidth: 200, borderRadius: "40px" }}>
      <CardContent>
        <h2>Register</h2>
        <Box sx={{ minWidth: 180 }}>
          <FormControl component="form" sx={{ '& > :not(style)': { m: 1, width: '50ch' }, }}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
          >
            <div>
              <TextField id="Email-basic" label="Email" variant="standard" type="email" value={email} onChange={(e) => (setEmail(e.target.value))} />
            </div>
            <div>
              <TextField id="Name-basic" label="Name" variant="standard" value={name} onChange={(e) => (setName(e.target.value))} />
            </div>
            <div>
                <TextField sx={{ width: '20ch' }} 
                  select
                  label="Role"
                  value={role}
                  onChange={(e) => (setRole(e.target.value))}
                  variant="standard"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.code} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </TextField> 
            </div>
            <div>
              <TextField id="Password-basic" label="Password" variant="standard" type="password" value={password} onChange={(e) => (setPassword(e.target.value))} />
            </div>
            <div>
              <TextField id="PasswordCheck-basic" label="Password Confirmation" variant="standard" type="password" value={passwordCheck} onChange={(e) => (setPasswordCheck(e.target.value))} />
            </div>

            <CardActions className='button-section'>
              <Button variant="contained" onClick={handleLogin} type='submit' color="success" className='button-section-element' >Register  </Button>
              <Button variant="contained" onClick={handleBack} color="error" className='button-section-element' >Back    </Button>
              <Button variant="contained" onClick={handleCancel} color="secondary" className='button-section-element' >Cancel  </Button>
            </CardActions>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
