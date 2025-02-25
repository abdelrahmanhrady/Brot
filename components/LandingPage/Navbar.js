import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  return (
    
    <>
        
      <Box>
        <ImageWrapper>
          <Image src="/EdEx.png" width={136} height={76} />
        </ImageWrapper>
        <Link target="_blank" href="/SignUp">
            <BoxSignUp>
            Sign Up
            </BoxSignUp>
        
        </Link>

        <BoxLogIn>
            Log In
        </BoxLogIn>
      </Box>
    </>
  );
};



const Box = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 99px;
  background: #000b33;
  border-radius: 0px;
`;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 136px;
  height: 76px;
  border-radius: 0px;
  padding: 10px 30px;
`;

const BoxSignUp = styled.div`
font-family: 'Noto Sans Georgian', sans-serif;    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 7px 28px;
    font-size: 18px;
    background: #0B669D;
    position: absolute; 
    cursor: pointer;
    left: 90%;
    top: 24px;
    font-weight: bold;

    border: 2px solid #c9ebff;
    border-radius: 15px;

    &:hover{
    
    border:2px solid #c9ebff;
    background: #c9ebff;
    transition: .5s;
    }
`;

const BoxLogIn = styled.div`
font-family: 'Noto Sans Georgian', sans-serif;
    

    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 7px 30px;
    font-size: 18px;
    background: #0B669D;
    position: absolute; 
    cursor: pointer;
    left: 80%;
    top: 24px;
    font-weight: bold;

    border: 2px solid #c9ebff;
    border-radius: 15px;

    &:hover{
    
    border:2px solid #c9ebff;
    background: #c9ebff;
    transition: .5s;
    }
`;



export default Navbar;
