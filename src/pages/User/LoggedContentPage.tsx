import React, { useState } from 'react';
import LoggedBarPage from './LoggedBarPage';
import { User, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth, firebaseDatabase, firebaseStorage } from '../../services/Firebase/FirebaseService';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Alert, AlertColor, Backdrop, Button, CardActions, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Slide, Snackbar, TextField, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SaveIcon from '@mui/icons-material/Save';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import packageJson from '../../../package.json';
import PasswordIcon from '@mui/icons-material/Password';
import { UserModel } from '../../services/UserModel/UserModel';

const LoggedContentPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [urlProfile, setUrlProfile] = useState('');
    const [UidUser] = useState('');
    const [gender, setGender] = useState('');
    const [progress, setProgress] = useState(0);
    const [openResultUpload, setOpenResultUpload] = useState(false);
    const [messageUpload, setMessageUpload] = useState('');
    const [severityMessage, setSeverityMessage] = useState<AlertColor>();
    const [error, setError] = useState('');
    const [genderDetail, setGenderDetail] = useState('Mejor dicho...');
    const [dataUserExist, setDataUserExist] = useState<UserModel>();
    let userLogged: User | null = null;

    document.title = document.title = packageJson.title + ' ' + name;

    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            userLogged = user;
            const uid = userLogged.uid;
            if(dataUserExist){

            }else{
                loadUserData(uid);
            }
        } else {
            window.location.href = '/Login'; 
        }
    });

    function loadUserData(uid: string) {
        const usersCollection = collection(firebaseDatabase, 'users');
        getDoc(doc(usersCollection, uid))
            .then((document) => {
                setDataUserExist(new UserModel(document.get('name'), document.get('email'), document.get('role'), document.get('gender'), document.get('urlAvatarProfile'), document.get('uuid')));
                const genderRetrieved = document.get('gender');
                if (genderRetrieved != 'Masculino' && genderRetrieved != 'Femenino') {
                    setGender('Mejor dicho...');
                    setGenderDetail(genderRetrieved);
                } else {
                    setGender(genderRetrieved);
                }
            }).catch((error) => {
                console.error(error);
                alert(error);
            });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setOpen(true);
            const reference = ref(firebaseStorage, `/images/${UidUser}/avatar`);
            const uploadTask = uploadBytesResumable(reference, e.target.files[0]);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrlProfile(downloadURL);
                        const userDoc = doc(firebaseDatabase, 'users', UidUser);
                        updateDoc(userDoc, { 'urlAvatarProfile': urlProfile })
                            .then(() => {
                                setMessageUpload(name + ", el avatar del perfil se ha cambiado.")
                                setSeverityMessage('success');
                            }).catch((error) => {
                                setMessageUpload(name + ", el avatar del perfil NO se ha podido cambiar: ERROR al actualizar:\n " + error.message)
                                setSeverityMessage('error');
                                setError(error.message);
                            }).finally(() => {
                                setProgress(100); setOpen(false); setProgress(0); setOpenResultUpload(true);
                            });
                    });
                }
            );
        }
    };

    const handleSave = () => {
        setOpen(true);
        const able = checkName() && checkRole();
        if (able) {
            let genderToStore: string;
            if (gender === 'Masculino' || gender === 'Femenino') {
                genderToStore = gender;
            } else {
                genderToStore = genderDetail;
            }
            if(dataUserExist){
                const userDoc = doc(firebaseDatabase, "users", dataUserExist.uuid );
                updateDoc(userDoc, { 'name': dataUserExist.name, 'gender': genderToStore })
                    .then(() => {
                        setMessageUpload("Datos actualizados correctamente.");
                        setSeverityMessage('success');
                        if(dataUserExist){
                            loadUserData(dataUserExist.uuid);
                        }
                    }).catch((error) => {
                        setMessageUpload("ERROR al actualizar:\n " + error.message);
                        setSeverityMessage('error');
                        setError(error.message);
                    }).finally(() => {
                        setOpen(false);
                        setOpenResultUpload(true);
                    });
            }
        } else {
            setOpen(false);
        };
    }

    const handleClose = () => {
        setOpenResultUpload(false);
        setPasswordAlert(false);
        setOpen(false);
    };

    function checkName(): boolean {
        let result = false;
        if (dataUserExist) {
            result = dataUserExist.name.length > 2;
            setError(result ? "" : "No es un nombre válido");
        }
        return result;
    }

    function checkRole(): boolean {
        let result = false;
        if (dataUserExist) {
            result = dataUserExist.role.length > 2;
            setError(result ? "" : "El rol es obligatorio");
        }
        return result;
    }


    const onKeyDown = (e: { key: string; }) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    const genders = [
        { name: 'Masculino', code: 'MA' },
        { name: 'Femenino', code: 'FE' },
        { name: 'Mejor dicho...', code: 'UN' }
    ];

    const genderDetailHTML = <TextField sx={{ width: '20ch' }} id="gender-detail-basic" label="Gender" variant="standard" value={genderDetail === 'Mejor dicho...' ? '' : genderDetail} onChange={(e) => (setGenderDetail(e.target.value))} onKeyDown={onKeyDown} />;

    function CustomErrorAlert() {
        if (error.length > 0) {
            return <Alert severity="error" >{error}</Alert>;
        } else {
            return <p></p>;
        }
    }

    function showDialogToChangePassword() {
        setPasswordAlert(true);
    }


    function handleSendPasswordEmail() {
        if (dataUserExist) {
            setPasswordAlert(false);
            setOpen(true);
            sendPasswordResetEmail(firebaseAuth, dataUserExist.email)
                .then(() => {
                    setMessageUpload("Enviado enlace de restauración de contraseña a " + dataUserExist.email);
                    setSeverityMessage('success');
                }).catch((error) => {
                    setMessageUpload("ERROR al enviar enlace de restauración de contraseña:\n " + error.message)
                    setSeverityMessage('error');
                }).finally(() => {
                    setOpen(false); setOpenResultUpload(true);
                });
        }
    }

    const handleNameChange = (e: { target: { value: any; }; }) => {
        //setName({...dataUserExist,name: e.target.value}) 
        if (dataUserExist) {
            setDataUserExist({ ...dataUserExist, name: e.target.value });
        }
    }

    const handleGenderChange = (e: { target: { value: any; }; }) => {
        //setName({...dataUserExist,name: e.target.value})
        setGender(e.target.value);
    }

    return (
        <React.Fragment>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" variant='determinate' value={progress} />
            </Backdrop>
            <LoggedBarPage username={dataUserExist?.name} urlProfile={dataUserExist?.urlAvatarProfile}></LoggedBarPage>
            <FormControl component="form" sx={{ p: 4, textAlign: "left", '& > :not(style)': { m: 1, width: '90%' }, marginTop: "1rem" }} autoComplete="off">

                <Chip label={ dataUserExist?.email  } variant="filled" color="default" />
                <Chip label={dataUserExist?.role } variant="filled" color="default" />

                <TextField id="Name-basic" placeholder="Nombre" variant="standard" value={dataUserExist?.name} name="name" onChange={handleNameChange}
                    required />

                <TextField sx={{ width: '20ch' }}
                    select
                    id="GenderField"
                    label="Género"
                    value={gender} name="gender"
                    variant="standard"
                    onChange={handleGenderChange}
                >
                    {genders.map((gender) => (
                        <MenuItem key={gender.code} value={gender.name}>
                            {gender.name}
                        </MenuItem>
                    ))}
                </TextField>

                {gender === 'Mejor dicho...' ? genderDetailHTML : ''}

                <small style={{ textAlign: 'justify' }}>(*)Campos&nbsp;obligatorios</small>

                <CustomErrorAlert></CustomErrorAlert>
                <CardActions className='button-section'>
                    <Tooltip title='Cambiar contraseña'>
                        <Button
                            variant="contained"
                            component="label"
                            color="inherit"
                            sx={{ width: '5ch', height: '4ch' }}
                            onClick={showDialogToChangePassword}
                        >
                            <PasswordIcon />
                        </Button>
                    </Tooltip>
                    <Dialog
                        open={passwordAlert}
                    >
                        <DialogTitle id="alert-password-dialog-title">
                            Cambiando contraseña...
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-password-dialog-description">
                                Para cambiar la contraseña, se enviará un correo electrónico ¿Continuamos?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{ color: "red" }} onClick={handleClose} autoFocus>Mejor no, cancelar</Button>
                            <Button sx={{ color: "#6b9080" }} onClick={handleSendPasswordEmail}>Si, adelante</Button>
                        </DialogActions>
                    </Dialog>
                    <div id='avataruploadsection'>
                        <Tooltip title='Actualizar foto de perfil/avatar'>
                            <Button
                                variant="contained"
                                component="label"
                                color="warning"
                                sx={{ width: '5ch', height: '4ch' }}
                            >
                                <PersonIcon /><UpgradeIcon />
                                <input accept="image/*"
                                    type="file"
                                    hidden
                                    onChange={handleFileChange}

                                />
                            </Button>
                        </Tooltip>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            open={openResultUpload}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message={messageUpload}
                            key={messageUpload}
                            TransitionComponent={Slide}>
                            <Alert
                                onClose={handleClose}
                                severity={severityMessage}
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                {messageUpload}
                            </Alert>
                        </Snackbar>
                    </div>
                    <Tooltip title="Actualizar datos">
                        <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#6b9080", ":hover": { backgroundColor: "#506C60" } }} className='button-section-element' startIcon={<SaveIcon />} />
                    </Tooltip>
                </CardActions>

            </FormControl>
        </React.Fragment>
    );
}

export default LoggedContentPage
