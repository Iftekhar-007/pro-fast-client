import React, { useEffect, useState } from "react";
import Context from "./Context";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
// import { signInWithEmailAndPassword } from "firebase/auth/cordova";

// import { createUserWithEmailAndPassword } from "firebase/auth/cordova";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const createUserWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailAndPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("get user by effect", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const userinfo = {
    createUserWithEmailPass,
    signInWithGoogle,
    logOutUser,
    user,
    setUser,
    loading,
    signInWithEmailAndPass,
  };
  return <Context value={userinfo}>{children}</Context>;
};

export default AuthProvider;
