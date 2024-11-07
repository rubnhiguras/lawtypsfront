import React, { useState } from "react";
import LoggedBarPage from "./LoggedBarPage";
import LawyerGenericContent from "./LawyerP/LawyerGenericContent";
import LoggedUserDataForm from "./Data/LoggedUserDataForm";
import {
  firebaseAuth,
  firebaseDatabase,
} from "../../services/Firebase/FirebaseService";
import { collection, doc, getDoc } from "firebase/firestore";
import { UserModel } from "../../services/Model/UserModel/UserModel";
import { PageEnumModel } from "../../services/Model/PageModel/PageEnumModel";
import NotFoundPage from "../WrongP/NotFoundPage";

function LoggedContentPage(props: {
  _useruuid: string;
  _uservalidated: boolean;
}) {
  const [dataUserExist, setDataUserExist] = useState<UserModel>();

  const uid = props._useruuid;
  const valided = props._uservalidated;

  if (uid) {
    loadUserData(uid, valided);
  }

  function loadUserData(uid: string, valided: boolean) {
    const usersCollection = collection(firebaseDatabase, "users");
    getDoc(doc(usersCollection, uid))
      .then((document) => {
        setDataUserExist(
          new UserModel(
            document.get("name"),
            document.get("email"),
            document.get("role"),
            document.get("gender"),
            document.get("urlAvatarProfile"),
            document.get("uuid"),
            valided
          )
        );
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }

  const componentUserDataForm = (
    <LoggedUserDataForm datauserparam={dataUserExist}></LoggedUserDataForm>
  );

  const componentHeaderNav = (
    <LoggedBarPage
      username={dataUserExist?.name}
      urlProfile={dataUserExist?.urlAvatarProfile}
      userArt={dataUserExist?.role}
    ></LoggedBarPage>
  );

  const componentAbogados = (
    <LawyerGenericContent datauserparam={dataUserExist}></LawyerGenericContent>
  );

  const componentGeneric = (
    <> 
      <NotFoundPage /> 
    </>
  );

  const componentCasos = componentGeneric;

  function generateUserDataContent(): JSX.Element {
    switch (window.location.pathname) {
      case PageEnumModel.P_USUARIO: {
        if (firebaseAuth.currentUser) {
          loadUserData(
            firebaseAuth.currentUser?.uid,
            firebaseAuth.currentUser?.emailVerified
          );
        }
        return componentUserDataForm;
      }
      case PageEnumModel.P_ABOGADOS: {
        return componentAbogados;
      }
      case PageEnumModel.P_CASOS: {
        return componentCasos;
      }
      default: {
        return componentGeneric;
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
