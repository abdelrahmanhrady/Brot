// Home.js
import React from "react";
import LogIn from "@/components/SignUpIn/LogInCSS"; // Import SignIn component



export default function Home() {
  const handleSubmit = (userData) => {
    console.log(userData); //For testing
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian&display=swap"
        rel="stylesheet"
      />

      <LogIn onSubmit={handleSubmit} />
    </>
  );
}
