import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'
import { Backdrop, Box, Button, Card, CardActions, CardContent, CircularProgress, FormControl, MenuItem, TextField } from '@mui/material';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { collection, doc, setDoc } from 'firebase/firestore';
import { UserModel } from '../../services/UserModel/UserModel';
import { firebaseAuth, firebaseDatabase } from '../../services/Firebase/FirebaseService';

const defaultAvatarUrlUn: string = "https://www.limonium.org/wp-content/uploads/2023/08/default-avatar.webp";
const defaultAvatarUrlFe: string = "https://www.svgrepo.com/show/10678/avatar.svg"
const defaultAvatarUrlMa: string = "https://www.svgrepo.com/show/61986/avatar.svg"

const RegisterPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [genderDetail, setGenderDetail] = useState('');
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User 
      navigate("/user");
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
    if (email && name && password && role) {
      let urlProfile: string;
      let genderToStore: string;
      if(gender === 'Masculino') {
         urlProfile = defaultAvatarUrlMa;
         genderToStore = gender;
      }else if(gender === 'Femenino') {
        urlProfile = defaultAvatarUrlFe;
        genderToStore = gender;
      }else{
        urlProfile = defaultAvatarUrlUn;
        genderToStore = genderDetail;
      }
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(credential => {
          const userData: UserModel = new UserModel(
            name,
            email,
            role,
            genderToStore,
            urlProfile,
            credential.user.uid
          );
          const usersCollection = collection(firebaseDatabase, 'users');
          setDoc(doc(usersCollection, credential.user.uid), { ...userData })
            .then(ref => {
              console.log(ref);
            }).catch((error) => {
              alert(error.message);
            }).finally(() => { setOpen(false); });
        });
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

  const genders = [
    { name: 'Masculino', code: 'MA' },
    { name: 'Femenino', code: 'FE' },
    { name: 'Mejor dicho...', code: 'UN' }
  ];

  const genderDetailHTML = <TextField sx={{ width: '20ch' }} id="gender-detail-basic" label="Gender" variant="standard" value={genderDetail} onChange={(e) => (setGenderDetail(e.target.value))} />;
  
  return (
    <Card id="registercard" sx={{ marginTop: 20, minWidth: 200, borderRadius: "40px" }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <TextField sx={{ width: '20ch' }}
                select
                label="Gender"
                value={gender}
                onChange={(e) => (setGender(e.target.value))}
                variant="standard"
              >
                {genders.map((gender) => (
                  <MenuItem key={gender.code} value={gender.name}>
                    {gender.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div >
              { gender === 'Mejor dicho...' ? genderDetailHTML : ""} 
            </div>

            <div>
              <TextField id="Password-basic" label="Password" variant="standard" type="password" value={password} onChange={(e) => (setPassword(e.target.value))} />
            </div>
            <div>
              <TextField id="PasswordCheck-basic" label="Password Confirmation" variant="standard" type="password" value={passwordCheck} onChange={(e) => (setPasswordCheck(e.target.value))} />
            </div>

            <CardActions className='button-section'>
              <Button variant="contained" onClick={handleLogin} color="success" className='button-section-element' >Register  </Button>
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
