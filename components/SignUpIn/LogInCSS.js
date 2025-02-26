// SignInCSS.js
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

// SignIn Component
const LogIn = ({ onSubmit }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    errorMessage: "Error"
  });


  //Handling Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };


  const handleSubmit = () => {

   }

  return (
    <>
      <Container>
        <FormContainer>
          <Title>Log In</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Username:</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                required
              />
            </FormGroup>
 
            <FormGroup>
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>
     
            <Button type="submit">Log In</Button>
          </form>
        </FormContainer>
      </Container>

      <ImageWrapperBlr>
          <Image src="/background.jpg" width={1576} height={772} />
      </ImageWrapperBlr>
      <ImageWrapper>
        <Image src="/background.jpg" width={1576} height={772} />
      </ImageWrapper>
    </>
  );
};

const ImageWrapperBlr = styled.div`
 
  z-index: -1;
  position: absolute;
  left: -40px;
  top: 0px;
  border-radius: 0px;
  background-size: cover;
  background-position: center;
`;

const ImageWrapper = styled.div`
  filter: blur(10px);
  z-index: -1;
  position: absolute;
  left: -40px;
  top: 0px;
  border-radius: 0px;
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: transparent;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: rgb(255, 215, 0);
    outline: none;
  }
  
 
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: rgb(255, 215, 0);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgb(208, 177, 0);
  }
`;
const TermsLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;

  a {
    color: #3498db;
    text-decoration: none;
  }
`;

export default LogIn;
