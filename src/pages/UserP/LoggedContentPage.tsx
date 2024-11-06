import React, { useState } from 'react';
import LoggedBarPage from './LoggedBarPage';
import LawyerGenericContent from './LawyerP/LawyerGenericContent';
import { User, onAuthStateChanged  } from 'firebase/auth';   
import LoggedUserDataForm from './Data/LoggedUserDataForm';
import { firebaseAuth, firebaseDatabase } from '../../services/Firebase/FirebaseService';
import { collection, doc, getDoc } from 'firebase/firestore'; 
import ImgThinking from '../../assets/thinking.svg';
import { UserModel } from '../../services/Model/UserModel/UserModel';
import { PageEnumModel } from '../../services/Model/PageModel/PageEnumModel';


function LoggedContentPage(){ 
    let userLogged: User | null = null;
    
    const [dataUserExist, setDataUserExist] = useState<UserModel>();
    
    
    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            userLogged = user;
            const uid = userLogged.uid;
            if (!dataUserExist) {
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
            }).catch((error) => {
                console.error(error);
                alert(error);
            });
        }
        
        const componentUserDataForm = (<LoggedUserDataForm datauserparam={dataUserExist}></LoggedUserDataForm>);
        
        const componentHeaderNav = (<LoggedBarPage username={dataUserExist?.name} urlProfile={dataUserExist?.urlAvatarProfile} userArt={dataUserExist?.role}></LoggedBarPage>);
        
        const componentAbogados = (<LawyerGenericContent datauserparam={dataUserExist}></LawyerGenericContent>);
        
        const componentCasos = (<h3>Página de casos en contrucción...</h3>);
        
        const componentGeneric = (<><h3>Página seleccionada actualmente en contrucción...</h3><div><img src={ImgThinking} width="250" height="260"></img></div></>);

        function generateUserDataContent():  JSX.Element {
        switch(window.location.pathname) { 
            case PageEnumModel.P_USUARIO: {
                if(firebaseAuth.currentUser){
                    loadUserData(firebaseAuth.currentUser?.uid); 
                }
                return (componentUserDataForm);
            }
            case PageEnumModel.P_ABOGADOS: { 
                return (componentAbogados); 
            } 
            case PageEnumModel.P_CASOS: { 
                return (componentCasos);
             } 
            default: { 
                return (componentGeneric);
            } 
         } 
    }

    return (
        <React.Fragment>
            {componentHeaderNav}
            {generateUserDataContent()}
        </React.Fragment>
    );
}

export default LoggedContentPage;
