import { Link } from "react-router-dom";
import "../Acetylate the parts/Allstyle.css";
import "../Acetylate the parts/header.css";
import "../Style/The small screen.css";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useContext } from "react";
import ThemeContext from "../datadarkmode";
import { auth } from "../firebase";
import {   signOut  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Header = () => {
  const { mode, mode1, changeName, changeName1 } = useContext(ThemeContext);
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();


  const navigate = useNavigate()
  return (
  <>
      <div className={`headertitle ${mode}`}>
        <Link to="/">{t('Attack')}</Link>
       <div>
         <button
           onClick={() => {
             changeName(mode == "lighet" ? "dark" : "lighet");
             changeName1(mode1 == "lighet" ? "dark1" : "lighet");
           }}
         >
           <i className="fa-solid fa-sun"></i>
           <i className="fa-solid fa-moon"></i>
         </button>
       </div>
     
    
        <div className="headerlink" sx={{  display: 'flex',
    alignItems: 'center'}}>
        <i onClick={() => {
          i18n.changeLanguage(i18n.language === 'en'? 'er':'en');
        }} className="fa-solid fa-earth-asia"></i>
          {!user && ( 
            <>
              <Link  to="/Forgetpassword">{t('Forget password')}</Link>
              <Link  to="/Signup">{t('sign-up')}</Link>
              <Link  to="/Signin">{t('sign in')}</Link>
            </>
          )}
          {user && (
            <>
          <Link onClick={() => {
           signOut(auth).then(() => {
            navigate('/')
          }).catch((error) => {
        
          });
          }} to="">{t('sign-out')}</Link>
              <Link  to="/Mission">{t('mission')}</Link>
              <Link  to="/About">{t('About')}</Link>
              
            </>
          )}
        </div>
      </div>
     
  </>
  );
};

export default Header;
