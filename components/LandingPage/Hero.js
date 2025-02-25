import React from 'react';
import styled from 'styled-components';
import Image from "next/image";
import Link from "next/link";


const Hero = () => {
  return (
    <>
      <ImageWrapper>
        <Image src="/storageimg.jpg" width={1536} height={515} />
      </ImageWrapper>

      <HeadText>
        Manage and Improve your <br></br>   Educational Experience
        
      </HeadText>
      <Link target="_blank" href="/SignUp">
        <BoxStart>
              Start Now
        </BoxStart>
      </Link>
    </>


  );
};







const ImageWrapper = styled.div`
  position: absolute;
  left: 0%;
  top: 97px;
  border-radius: 0px;
`;
const BoxStart = styled.div`
    font-family: 'Noto Sans Georgian', sans-serif;    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 7px 32px;
    font-size: 32px;
    background: #c9ebff;
    position: absolute; 
    cursor: pointer;
    left: 45%;
    top: 330px;
    font-weight: bold;

    border: 4px solid #0B669D;
    border-radius: 15px;

    &:hover{
    
    border:4px solid #0B669D;
    background: #0B669D;
    transition: .5s;
    }
`;


const HeadText = styled.h1`
  text-shadow: 
    1px 1px 0px #0B669D, 
    -1px -1px 0px #0B669D,
    1px -1px 0px #0B669D,
    -1px 1px 0px #0B669D;


  position: absolute;

  left: 28%;
  top: 150px;
  width: 475px;
  height: 87px;

  color: rgba(201, 235, 255, 1);  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  font-size: 56px;
  text-rendering: geometricPrecision;
  caret-color: rgba(201, 235, 255, 1);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
`;

export default Hero;
