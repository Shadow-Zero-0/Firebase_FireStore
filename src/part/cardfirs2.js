import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Main from "./Main";
import { Atom } from "react-loading-indicators";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

const Cardfirs2 = ({cardemodel}) => {
  const [fulopacity, setfulopacity] = useState(false);
  const [value1, setvalue1] = useState()
  const [come, setcome] = useState(true)
  const [user] = useAuthState(auth);
  const [order, setOrder] = useState(orderBy("id", "desc"));
  const [value, loading] = useCollection(
    query(collection(db, user.uid), order)
  );
  const { t, i18n } = useTranslation();

  if (loading) {
    return (
      <Main>
        <Atom color="#1b6a1b" size="large" text="" textColor="" />
      </Main>
    );
  }

  return (
    <>
      <div className="divbutton">
       {come &&  
       <>
        <button
           onClick={() => {
             setfulopacity(true);
             setOrder(orderBy("id", "asc"));
           }}
           style={{ opacity: fulopacity ? "1" : "0.5" ,display: cardemodel ? "none" : null}}
          
         >
           {t('Oldest first')}
         </button>
         <button
           onClick={() => {
             setfulopacity(false);
             setOrder(orderBy("id", "desc"));
           }}
           style={{ opacity: fulopacity ? "0.5" : "1" ,display: cardemodel ? "none" : null}}
         >
           {t('Newest first')}
         </button>
       </>
        }
        <select value={value1} onChange={(eo) => {
          if(eo.target.value === 'ss'){
            setOrder(where("Completed", "==", true));
            setvalue1('ss')
            setcome(false)
          } else if (eo.target.value === 'dd'){
            setOrder(where("Completed", "==", false))
            setvalue1('dd')
            setcome(false)
          }else if (eo.target.value === 'aa'){
            setOrder(orderBy("id"))
            setvalue1('aa')
            setcome(true)
          }
        }} className="select">
          <option value="aa">{t('All task')}</option>
          <option  value="ss">{t('Completed')}</option>
          <option value="dd">{t('Not Completed')}</option>
        </select>
      </div>
      <div className="sectionfirst">
        {value.docs.map((item) => {
          const data = item.data().dateils || [];
          return (
            <Link dir="auto" to={`/Firsttask/${item.data().id}`} key={item.id}>
              <div>
                <h2>{item.data().title}</h2>
                {data.map((detail, index) =>
                  index < 2 ? <li key={index}>{detail}</li> : null
                )}
                <p>
                  <Moment fromNow ago>
                    {item.data().id}
                  </Moment>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Cardfirs2;
