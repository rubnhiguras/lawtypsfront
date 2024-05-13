import Box from '@mui/material/Box';
import React, { useState } from 'react';
import LoggedBarPage from './LoggedBarPage';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth, firebaseDatabase, firebaseStorage } from '../../services/Firebase/FirebaseService';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertColor, AlertPropsColorOverrides, Backdrop, Button, CircularProgress, Slide, Snackbar } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


function LoggedContentPage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [urlProfile, setUrlProfile] = useState('');
    const [UidUser, setUidUser] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [progress, setProgress] = useState(0);
    const [openResultUpload, setOpenResultUpload] = useState(false);
    const [messageUpload, setMessageUpload] = useState(''); 
    const [severityMessage, setSeverityMessage] = useState<AlertColor>(); 

    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            const usersCollection = collection(firebaseDatabase, 'users');
            getDoc(doc(usersCollection, uid))
                .then((document) => {
                    setEmail(document.get('email'));
                    setName(document.get('name'));
                    setGender(document.get('gender'));
                    setRole(document.get('role'));
                    setUrlProfile(document.get('urlAvatarProfile'))
                    setUidUser(document.get('uuid'));
                }).catch((error) => {
                    console.log(error);
                    alert(error);
                });

        } else {
            navigate("/login");
        }

    });

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
                                setMessageUpload( name + ", el avatar del perfil NO se ha podido cambiar: ERROR al actualizar:\n " + error.message)
                                setSeverityMessage('error');
                            }).finally(() => {
                                setProgress(100); setOpen(false); setProgress(0); setOpenResultUpload(true);
                            });
                    });
                }
            );
        }
    };

    const handleClose = () => {
        setOpenResultUpload(false);
    };
 
    //<LoggedBarPage {...propsHeader} ></LoggedBarPage>

    return (
        <React.Fragment>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" variant='determinate' value={progress} />
            </Backdrop>
            <LoggedBarPage username={name}  urlProfile={urlProfile}></LoggedBarPage>
            <Box component="section" sx={{ p: 2, marginTop: "2rem" }}>
                <h2>Aquí sus datos...</h2>
                <div>
                    <p>{email}</p>
                    <p>{name}</p>
                    <p>{gender}</p>
                    <p>{role}</p>

                </div>
                <div>

                    <Button
                        variant="contained"
                        component="label"
                        color="secondary"
                    >
                        Actualizar foto perfil
                        <input accept="image/*"
                            type="file"
                            hidden
                            onChange={handleFileChange}

                        />
                    </Button>

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

            </Box>
        </React.Fragment>
    );
}

export default LoggedContentPage
