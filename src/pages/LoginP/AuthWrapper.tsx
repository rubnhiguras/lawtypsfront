import { useState, useEffect} from 'react';
import { firebaseAuth } from '../../services/Firebase/FirebaseService'; // Import Firebase Authentication instance
import { onAuthStateChanged, User } from 'firebase/auth'; 
import LoggedContentPage from '../UserP/LoggedContentPage'
import LoginPage from './LoginPage';
import { Backdrop, CircularProgress } from '@mui/material';

export const AuthWrapper = () => {

  const spinner = (<>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
 
  const [component, setComponent] = useState<JSX.Element>(spinner);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user){
        setComponent(<LoggedContentPage _useruuid={user.uid} _uservalidated={user.emailVerified}/>);
      } else {
        setComponent(<LoginPage />);
      }
    });
    return unsubscribe;
  }, []);
 
    return (component);

}; 
