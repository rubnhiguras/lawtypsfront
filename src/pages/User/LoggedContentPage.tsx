import Box from '@mui/material/Box';
import React from 'react';
import LoggedBarPage from './LoggedBarPage';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth, firebaseDatabase } from '../../services/Firebase/FirebaseService';
import { collection, doc, getDoc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

let userlogged: string;
let urlProfile: string;

function LoggedContentPage() {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false); 

    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
           
         
        const uid = user.uid;
        const usersCollection = collection(firebaseDatabase, 'users');
        getDoc(doc(usersCollection, uid))
            .then((document) => {
                userlogged = document.get('name'); 
            }).catch((error) => {
                console.log(error);
                alert(error);
            });
    
        } else {
            navigate("/login");
        }
          
      }); 

    

    return (
        <React.Fragment>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <LoggedBarPage username={userlogged} ></LoggedBarPage>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginTop: "2rem" }}>
                This Box renders as an HTML section element.
            </Box>
        </React.Fragment>
    );
}

export default LoggedContentPage
