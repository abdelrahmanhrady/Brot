// Home.js
import React from "react";
import SignIn from "@/components/SignUpIn/SignInCSS"; // Import SignIn component

export default function Home() {
  const handleSubmit = (userData) => {
    console.log(userData); //For testing
  };

  return (
    <>
      <link rel="icon" type="image/x-icon" href="./public/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian&display=swap"
        rel="stylesheet"
      />

      <SignIn onSubmit={handleSubmit} />
    </>
  );
}
