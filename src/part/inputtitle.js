import { doc, updateDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import React, { useRef } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import Main from "./Main";
import { Atom } from "react-loading-indicators";

const Inputtitle = () => {
  let { id } = useParams();
  const Ref = useRef(null);
  const [user, loading, error] = useAuthState(auth);
  const [value, loadingg, errorr] = useDocument(doc(db, user.uid, id));

  if (loading || loadingg) {
    return (
      <Main>
        <Atom color="#1b6a1b" size="large" text="" textColor="#000000" />
      </Main>
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

  return (
    <div className="inputtitle">
      <input
        style={{ textDecoration: data.Completed ? 'line-through wavy black' : null }}
        value={data.title || ""}
        onChange={async (eo) => {
          await updateDoc(doc(db, user.uid, id), {
            title: eo.target.value,
          });
        }}
        ref={Ref}
        type="text"
      />
      <i
        onClick={() => {
          Ref.current.focus();
        }}
        className="fa-solid fa-pen-to-square"
      ></i>
    </div>
  );
};

export default Inputtitle;
