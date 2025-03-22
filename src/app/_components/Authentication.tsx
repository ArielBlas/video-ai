"use client";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";

import { ReactNode } from "react";

const Authentication = ({ children }: { children: ReactNode }) => {
  const provider = new GoogleAuthProvider();

  const onSignInClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(token, user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return <div onClick={onSignInClick}>{children}</div>;
};

export default Authentication;
