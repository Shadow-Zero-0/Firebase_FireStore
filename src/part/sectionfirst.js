import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import Moment from "react-moment";
import Main from "./Main";
import { Atom } from "react-loading-indicators";
import { useTranslation } from "react-i18next";

const Sectionfirst = () => {
  let { id } = useParams(null);
  const [user, loading, error] = useAuthState(auth);
  const [value, loadingg, errorr] = useDocument(doc(db, user.uid, id));
  const { t } = useTranslation();


  if (loadingg) {
    return (
      <>
        <Main>
          <Atom color="#1b6a1b" size="large" text="" textColor="#000000" />
        </Main>
      </>
    );
  }
  if (!value || !value.exists()) {
    return (
      <Main>
      <Atom color="#1b6a1b" size="large" text="" textColor="#000000" />
    </Main>
    );
  }
  const data = value.data();
  if (value) {
    return (
      <>
        <div className="checkbox1">
          <p>
            <Moment fromNow ago>
              {value.data().id}
            </Moment>
          </p>
          <div>
            <input 
              onChange={async () => {
                await updateDoc(doc(db, user.uid, id), {
                  Completed:data.Completed == false ? true : false,
                });
              }}checked={value.data().Completed}
              type="checkbox"
              id="htmll"
            />
            <label  htmlFor="htmll">{t('Completed')}</label>
          </div>
        </div>

        {value.data().dateils.map((item) => {
          return (
            <div className="sectipnfirst">
          <p>{item}</p>
          <i onClick={async() => {
           await updateDoc(doc(db, user.uid, id), {
            dateils: arrayRemove(item),
         });
          }} className="fa-solid fa-trash"></i>
        </div>
          )
        })}
      </>
    );
  }
};

export default Sectionfirst;
