import Box from '@mui/material/Box';
import React from 'react';
import LoggedBarPage from './LoggedBarPage';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../services/Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function LoggedContentPage() {
    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
            console.log("uid", uid)
        } else {
            // User is signed out
            // ...
            console.log("user is logged out")
            navigate("/login")
        }
    });

    return (
        <React.Fragment>
            <LoggedBarPage></LoggedBarPage>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey', marginTop: "2rem" }}>
                This Box renders as an HTML section element.
            </Box>
        </React.Fragment>
    );
}

export default LoggedContentPage
