import Header from "../part/Header";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Main from "../part/Main";
import Footer from "../part/Footer";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { Atom } from "react-loading-indicators";
import { useTranslation } from "react-i18next";
const Forgetpassword = () => {
  const navigate = useNavigate();
  const [sendpassword, setsendpassword] = useState();
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();
  useEffect(() => {
 
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  }, );
  if (loading) {
    return (
      <>
        <Helmet>
          <title>About</title>
        </Helmet>
        <Header />
        <Main>
          <Atom color="#1b6a1b" size="large" text="" textColor="#000000" />
        </Main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Forget password</title>
      </Helmet>
      <Header />
      <Main>
        <div className="dadinput">
             <input required onChange={(eo) => {
                setsendpassword(eo.target.value)
             }} placeholder="Email :-"/>
             <button onClick={() => {
                sendPasswordResetEmail(auth, sendpassword)
                .then(() => {
                    navigate('/')
                })
                .catch((error) => {
               
                 
                });
             }}>{t('Snad Email')}</button>
        </div>
      
      </Main>
      <Footer />
    </>
  );
};

export default Forgetpassword;
