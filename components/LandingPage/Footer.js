import React from 'react';
import styled from 'styled-components';
import {useState, useEffect} from 'react'
import { useRouter } from "next/router";


const Footer = () => {
  const router = useRouter();

  const [sent,setSent] =useState('With Gambling you can win 1000% of your money, but you can only lose 100%')
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  

  function MemeGen(){
    let randomInt = getRandomInt(1, 10);


    switch(randomInt){
      case 1:
        setSent('99% of gamblers give up before hitting it big!')
        router.push("/SignUp");

      break;

      case 2:
        setSent('99% of short video viewers qui- oh wait they don\'t quit')
      break;

      case 3:
        setSent('99% of students stop studying before reaching the actual exam content')
      break;

      case 4:
        setSent('99% of breathers quit before reaching immortality')
      break;

      case 5:
        setSent('99% of programmers give up before finding the missing semi-colon')
      break;

      case 6:
        setSent('99% of EA games shut down before becoming free')
      break;

      case 7:
        setSent('99% of fishermen quit before fishing big')
      break;

      case 8:
        setSent('99% of 99% memes quit before being funny')
      break;

      case 9:
        setSent('99% of websites shut down before getting high engagement')
      break;

      case 10:
        setSent('99% of my brain quit before finding 99% memes')
      break;

    }
    
  }

  useEffect(() => {
    setTimeout(() => {
      MemeGen();
    }, 5000);
  }, [sent]); 
 
  return (
    <FooterSection>

      <FooterHeader>
      Motivational Quotes:
      </FooterHeader>
      <FooterText>
        
        <br></br>
        {sent}
      </FooterText>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 165px;
  background: rgb(51, 0, 0);
  border-radius: 0px;

`;

const FooterText = styled.p`
   position: fixed;
  top: 85%; 
  left: 50%;
  transform: translateX(-50%);  
  z-index: 1;
  color: rgb(255, 235, 120);
  margin: 0;  
`;

const FooterHeader = styled.h2`
  position: absolute;
  text-align: center;
  top: 20%;
  left:43%;
  z-index: 1;
  color: rgb(255, 235, 120);

`;


export default Footer;
