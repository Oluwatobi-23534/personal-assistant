import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "antd";
import { app } from "../config/firebase.config";

const Authenticate = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [auth, setAuth] = useState();

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(firebaseAuth, provider);
    console.log(res);
  };

  return (
    <div>
      {auth ? (
        <h1>To Do</h1>
      ) : (
        <Button onClick={loginWithGoogle} type="primary">
          Login
        </Button>
      )}
    </div>
  );
};

export default Authenticate;
