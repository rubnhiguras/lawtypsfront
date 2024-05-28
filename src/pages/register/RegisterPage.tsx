import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'
import { Alert, Backdrop, Box, Button, Card, CardActions, CardContent, CircularProgress, FormControl, MenuItem, TextField, Tooltip } from '@mui/material';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { collection, doc, setDoc } from 'firebase/firestore';
import { UserModel } from '../../services/UserModel/UserModel';
import { EMAIL_COND_REGEX, firebaseAuth, firebaseDatabase } from '../../services/Firebase/FirebaseService'; 
import packageJson from '../../../package.json';

const defaultAvatarUrlUn: string = "https://www.limonium.org/wp-content/uploads/2023/08/default-avatar.webp";
const defaultAvatarUrlFe: string = "https://www.svgrepo.com/show/10678/avatar.svg"
const defaultAvatarUrlMa: string = "https://www.svgrepo.com/show/61986/avatar.svg"

const RegisterPage: React.FC = () => {

  document.title = document.title = packageJson.title + ' ' + 'Register';

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [genderDetail, setGenderDetail] = useState('none'); 
  const [error, setError] = useState('');

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      //navigate("/user");
      window.location.href = '/User';
    } else {
      // User is signed out
      // ...
    }
  }); 

  const handleLogin = () => {
    setOpen(true);
    const able = checkPassword() && checkEmail() && checkName() && checkRole();
    if (able) {
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
              setError("¡Ups, algo no ha ido bien! " + error.message);
            }).finally(() => { setOpen(false); });
        });
    }else{
      setOpen(false);
    };
  };

  function checkPassword(): boolean {
    const result = password.length > 6 && passwordCheck === password;
    setError(result ? "" : "La contraseña debe tener al menos 6 caracteres y coincidir en ambos campos");
    return result ;
  }

  function checkEmail(): boolean { 
    const result = EMAIL_COND_REGEX.test(email);
    setError(result ? "" : "No es un  correo válido");
    return result;
  }

  function checkName(): boolean { 
    const result = name.length > 2;
    setError(result ? "" : "No es un nombre válido");
    return result;
  }
  
  function checkRole(): boolean { 
    const result = role.length > 2;
    setError(result ? "" : "El rol es obligatorio");
    return result; 
  }
  

  const handleBack = () => {
    window.location.href = '/Login';
    //navigate('/Login');
  };

  const onKeyDown = (e: { key: string; }) => {
    if (e.key === "Enter") {
      handleLogin();
    }
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

  const genderDetailHTML = <TextField sx={{ width: '20ch' }} id="gender-detail-basic" label="Gender" variant="standard" value={genderDetail==='none' ? '' : genderDetail} onChange={(e) => (setGenderDetail(e.target.value))} onKeyDown={onKeyDown}/>;
  
  function CustomErrorAlert() {
    if (error.length > 0) {
      return <Alert severity="error" >{error}</Alert>;
    } else {
      return <p></p>;
    }
  }

  return (
    <Card id="registercard" sx={{ marginTop: 0.4, minWidth: 100, borderRadius: "40px" }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CardContent>
        <h2>Register</h2>
        <Box sx={{ minWidth: 99 }}>
          <FormControl component="form" sx={{ '& > :not(style)': { m: 0.4, width: '29.5ch' }, }} 
            autoComplete="off"
          >
            <div>
              <TextField id="Email-basic" label="Email" variant="standard" type="email" value={email} onChange={(e) => (setEmail(e.target.value))} 
              onKeyDown={onKeyDown} required/>
            </div>
            <div>
              <TextField id="Name-basic" label="Name" variant="standard" value={name} onChange={(e) => (setName(e.target.value))} 
              onKeyDown={onKeyDown} required/>
            </div>
            <div>
              <TextField sx={{ width: '20ch' }}
                select
                label="Role"
                value={role}
                onChange={(e) => (setRole(e.target.value))}
                variant="standard"
                onKeyDown={onKeyDown}
                required
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
                onKeyDown={onKeyDown}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender.code} value={gender.name}>
                    {gender.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div >
              { gender === 'Mejor dicho...' ? genderDetailHTML : <br/>} 
            </div>

            <div>
              <TextField id="Password-basic" required label="Password" variant="standard" type="password" value={password} onChange={(e) => (setPassword(e.target.value))} onKeyDown={onKeyDown}/>
            </div>
            <div>
              <TextField id="PasswordCheck-basic" required label="Password Confirmation" variant="standard" type="password" value={passwordCheck} onChange={(e) => (setPasswordCheck(e.target.value))} onKeyDown={onKeyDown}/>
            </div>
            <div>
              <small style={{textAlign: 'justify', marginLeft:-50}}>(*)Campos&nbsp;obligatorios</small>
            </div>
            <CustomErrorAlert></CustomErrorAlert>
            <CardActions className='button-section'>
            <Tooltip title="Volver">
              <Button variant="contained" onClick={handleBack} color="info" className='button-section-element' startIcon={<ArrowBackIcon />} />
              </Tooltip>
              <Tooltip title="Registrar usuario e iniciar sesión">
              <Button variant="contained" onClick={handleLogin} color="success" className='button-section-element' startIcon={<AppRegistrationIcon />} /> 
              </Tooltip>
            </CardActions>
            
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
