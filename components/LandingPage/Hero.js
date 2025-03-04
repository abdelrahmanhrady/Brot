import React from 'react';
import styled from 'styled-components';
import Image from "next/image";
import Link from "next/link";


const Hero = () => {
  return (
    <>
      <ImageWrapperBlr>
        <Image src="/background.jpg" layout="fill" objectFit="cover"  />
      </ImageWrapperBlr>
      <ImageWrapper>
        <Image src="/background.jpg" layout="fill" objectFit="cover"  />
      </ImageWrapper>

      <HeadText>
      Guarantee your path to <br></br>     Successful Failure
        
      </HeadText>
      <Link target="_blank" href="/Game">
        <BoxStart>
              Play Now
        </BoxStart>
      </Link>
    </>


  );
};




const ImageWrapper = styled.div`

z-index: -1;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0px;
  border-radius: 0px;
  filter: blur(5px);

`;

const ImageWrapperBlr = styled.div`
 z-index: -1;
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0%;
  top: 0px;
  border-radius: 0px;
  filter: blur(0px);

`;
const BoxStart = styled.div`
    font-family: 'Noto Sans Georgian', sans-serif;    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 7px 32px;
    font-size: 32px;
    background: rgb(255, 215, 0);
    position: absolute; 
    cursor: pointer;
    left: 42%;
    top: 330px;
    font-weight: bold;

    border: 4px solid rgb(51, 0, 0);;
    border-radius: 15px;

    &:hover{
    
    border:4px solid rgb(51, 0, 0);;
    background: rgb(208, 177, 0);
    transition: .5s;
    }
`;


const HeadText = styled.h1`
  text-shadow: 
    1px 1px 0px black;, 
    -1px -1px 0px black;,
    1px -1px 0px black;,
    -1px 1px 0px black;


  position: absolute;

  left: 30%;
  top: 150px;
  width: 475px;
  height: 87px;

  color: rgb(255, 235, 120);  
  line-break: auto;
  overflow-wrap: initial;
  white-space: pre;
  font-size: 56px;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 235, 120);
  text-decoration: none;
  letter-spacing: 0px;
  font-family: "Noto Sans Georgian";
  font-style: normal;
  font-weight: 700;
`;

export default Hero;
