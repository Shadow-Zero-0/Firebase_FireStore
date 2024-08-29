import Main from "../part/Main";
import Footer from "../part/Footer";
import { Helmet } from "react-helmet-async";
import Header from "../part/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from 'react-i18next';
import "../Style/Home.css";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { Atom } from "react-loading-indicators";
function Home() {
  const { t } = useTranslation();
  const [send, setsend] = useState(true);
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <>
         <Helmet>
            <title>Home</title>
          </Helmet>
          <Header />

        <Main>
          <Atom color="#1b6a1b" size="large" text="" textColor="#000000" />
        </Main>
        <Footer />
      </>
    );
  }
  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Header />
          <Main>
            <h2>
              <span>{t('Please confirm the account')} &#129505;</span>
              <div className="dadinput">
                {send && (
                  <>
                    <button
                      onClick={() => {
                        sendEmailVerification(auth.currentUser).then(() => {setsend(false)});
                      }}
                    >
                      {t('Snad Email')}
                    </button>
                  </>
                )}
              </div>
            </h2>
          </Main>
          <Footer />
        </>
      );
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <Header />
          <Main>
            <h2 dir="auto">
              <span>{t('welcome')} {user.displayName} &#129505;</span>
            </h2>
          </Main>
          <Footer />
        </>
      );
    }
  }
  if (!user) {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Header />
        <Main>
          <h2>
            <span>{t('Please log in')} &#129505;</span>
          </h2>
        </Main>
        <Footer />
      </>
    );
  }
}

export default Home;
