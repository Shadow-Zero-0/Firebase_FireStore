import Main from "../part/Main";
import Footer from "../part/Footer";
import Header from "../part/Header";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../Style/About.css";
import { Atom } from "react-loading-indicators";
import Moment from "react-moment";
import { deleteUser } from "firebase/auth";
import { useEffect } from "react";

const About = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
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
  if (!user) {
    navigate("/");
  }

  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Header />
      <Main>
        <div>
          <h2>username : {user?.displayName}</h2>
          <h2>Email : {user?.email}</h2>
          <h2>
            Registration time :
            <Moment fromNow ago>
              {user?.metadata.creationTime}
            </Moment>
          </h2>
        </div>
        <div className="dadinput">
          <button
            onClick={() => {
              deleteUser(user)
                .then(() => {
                  navigate("/");
                })
                .catch((error) => {});
            }}
          >
            Delete user
          </button>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default About;
