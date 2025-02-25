import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import Navbar from "@/components/Dashboard/NavbarTest";
import { useStateContext } from "@/context/StateContext";
const Dashboard = () => {
  const { user } = useStateContext();

  const [age, setAge] = useState(2);

  const [msg, setMsg] = useState("");

  function updateAge() {
    let currentAge = age;
    currentAge = age + 1;
    setAge(currentAge);
  }

  function loseAge() {
    let currentAge = age;
    currentAge = age - 1;
    setAge(currentAge);
  }

  function message() {
    setMsg("\nBirthday!");
  }

  function useEff() {
    console.log("chicken");

    //   if(age!=2){

    //   if(age<1000){
    //   setTimeout(() => {
    //     setAge(age*2)
    //   }, 1000)//ms
    // }}
  }

  useEffect(useEff, [age]);
  useEffect(
    () => {
      setMsg("Yay, it's my birthday!");
    }, // Set message after 1 second
    [age]
  );

  return (
    <>
      <Section>
        {/* 
        <TopHeader>
          Dashboard
        </TopHeader> */}
        <p>I am {age} years old</p>
        <p>{msg}</p>
        <button onClick={updateAge}>It's my birthday</button>
        <button onClick={loseAge}>It's my birthday</button>
      </Section>
    </>
  );
};
//STYLED COMPONENTS
const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const TopHeader = styled.h1`
  font-size: 20px;
  display: flex;
`;

export default Dashboard;
