import Main from "../part/Main";
import Footer from "../part/Footer";
import Header from "../part/Header";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import "../Style/mission.css";
import { doc, setDoc } from "firebase/firestore";
import { Atom, ThreeDot } from "react-loading-indicators";
import Cardfirst2 from "../part/cardfirs2";
import { useTranslation } from "react-i18next";

const Mission = () => {

  const navigate = useNavigate();
  const [cardemodel, setcardemodel] = useState(false);
  const [arrey, setarrey] = useState([]);
  const [title, settitle] = useState();
  const [loding, setloding] = useState();
  const [dateils, setdateils] = useState("");
  const [magger, setmagger] = useState(false);
  const [user, loading] = useAuthState(auth);
  const data = new Date().getTime();
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
          <Atom color="#1b6a1b" size="large" text="" textColor="" />
        </Main>
      </>
    );
  }
  const subarrey = () => {
    if (!arrey.includes(dateils)) {
      arrey.push(dateils);
      setdateils("");
    }
  };

  return (
    <>
      <Helmet>
        <title>mission</title>
      </Helmet>
      <Header />
      <Main>
        <div className="looding" style={{ right: magger ? "10px" : "-300px" }}>
          <p className="looding">
            {t('Task added successfully')}
            <i className="fa-regular fa-circle-check"></i>
          </p>
        </div>

        {cardemodel && (
          <>
            <div className="section cardmodel">
              <div>
                <i
                  onClick={() => {
                    setcardemodel(false);
                  }}
                  className="fa-solid fa-xmark"
                ></i>
                <input
                  placeholder="TitleTask"
                  required
                  onChange={(eo) => {
                    settitle(eo.target.value);
                  }}
                />
                <Form>
                  <input
                    onChange={(eo) => {
                      setdateils(eo.target.value);
                    }}
                    value={dateils}
                    placeholder="dateils"
                  />
                  <button
                    onClick={() => {
                      subarrey();
                    }}
                    className="addnew1"
                  >
                    Add
                  </button>
                  {arrey.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </Form>
                <button
                  onClick={async () => {
                    setloding(true);
                    await setDoc(doc(db, user.uid, `${data}`), {
                      Completed: false,
                      title: title,
                      dateils: arrey,
                      id: data,
                    });
                    setloding(false);
                    setcardemodel(false);
                    setmagger(true);
                    setarrey([])
                    setInterval(() => {
                      setmagger(false);
                    }, 4000);
                  }}
                  className="addnew1"
                >
                  {loding ? (
                    <ThreeDot
                      color="#000000"
                      size="small"
                      text=""
                      textColor=""
                    />
                   
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </>
        )}
       
        <Cardfirst2  cardemodel={cardemodel}/>

        <button
          onClick={() => {
            setcardemodel(true);
          }}
          className="addnew"
        >
          {t('Add new first')}
        </button>
      </Main>
      <Footer />
    </>
  );
};

export default Mission;
