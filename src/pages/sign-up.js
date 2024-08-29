import Main from "../part/Main";
import Footer from "../part/Footer";
import Header from "../part/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "../Style/signup and singin.css";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Atom } from "react-loading-indicators";
import { useTranslation } from "react-i18next";
const SignUp = () => {
  const [email, setemail] = useState();
  const [massge, setmassge] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();

  useEffect(() => {
     if (user) {
    if (user.emailVerified) {
    navigate('/')
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
        <title>Signup</title>
      </Helmet>
      <Header />

      <Main>
        <h3>
          <span>{massge}</span>
        </h3>
        <div className="dadinput">
          <input required
            onChange={(eo) => {
              setusername(eo.target.value);
            }}
            type="text"
            placeholder="username :-"
          />

          <input required
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            type="gmail"
            placeholder="Email :-"
          />

          <input required
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            type="password"
            placeholder="password :-"
          />

          <button
            onClick={() => {
              createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  sendEmailVerification(auth.currentUser).then(() => {
                    updateProfile(auth.currentUser, {
                      displayName: username,
                    })
                      .then(() => {})
                      .catch((error) => {});
                    navigate("/");
                  });

                  const user = userCredential.user;
                })
                .catch((error) => {
                  setmassge(`${t('Please verify your email and password')}`);
                });
            }}
          >
            {t('sign-up')}
          </button>
          <h3>
            {t('If you have an account')} <Link to="/Signin">{t('sign in')}</Link>
          </h3>
        </div>
      </Main>

      <Footer />
    </>
  );
};

export default SignUp;
