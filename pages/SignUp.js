// Home.js
import React from "react";
import SignIn from "@/components/SignUpIn/SignInCSS"; // Import SignIn component
import { useRouter } from "next/router";




export default function Home() {

  const handleSubmit = () => {

  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian&display=swap"
        rel="stylesheet"
      />

      <SignIn onSubmit={handleSubmit} />
    </>
  );
}
