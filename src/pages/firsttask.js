import Footer from "../part/Footer";
import Header from "../part/Header";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import "../Style/firsttask.css";
import { useContext } from "react";
import ThemeContext from "../datadarkmode";
import Main from "../part/Main";
import { Atom } from "react-loading-indicators";
import Inputtitle from "../part/inputtitle";
import Buttonfooter from '../part/buttonfooter';
import Sectionfirst from "../part/sectionfirst";
import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
const Firsttask = () => {
  const [addtask, setaddtask] = useState(false);

  const [addarrey, setaddarrey] = useState();
  const { mode1 } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  let { id } = useParams(null);
const button = async() => {
  await deleteDoc(doc(db, user.uid, id));
  navigate('/Mission' ,{replace: true})
  
}
const { t } = useTranslation();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });
  if (loading) {
    return (
      <>
        <Main>
          <Atom color="#1b6a1b" size="large" text="" textColor="#000000" />
        </Main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Firsttask</title>
      </Helmet>
      <Header />
      <div className={`section25 ${mode1}`}>
        <Inputtitle  />
        <div className="parent">
          <Sectionfirst />
          {addtask && (
            <>
             
              <div className="Addtasks">
                <Form>
                  <input defaultValue={addarrey} onChange={(eo) => {
                    setaddarrey(eo.target.value)
                  }} required type="text" />
                  <button onClick={async() => {
                    await updateDoc(doc(db, user.uid, id), {
                      dateils: arrayUnion(addarrey),
                    });
                    setaddarrey('')

                  }} className="addnew1">{t('Add')}</button>
                </Form>
                <button
                  onClick={() => {
                    setaddtask(false);
                  }}
                  className="addnew1"
                >
                  {t('close')}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="firstbutton">
         <Buttonfooter setaddtask={setaddtask} button={button}/>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Firsttask;
