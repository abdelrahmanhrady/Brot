// SignInCSS.js
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { signUp } from "@/backend/Auth";
import { useRouter } from "next/router";


// SignIn Component
const SignIn = ({ onSubmit }) => {
  const router = useRouter();
  
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userData.password !== userData.confirmPassword) {
    
      setUserData({ ...userData, errorMessage: "Passwords do not match." });
      return;
    }

    try {
      const user = await signUp(userData.email, userData.password, userData.username);
      router.push("/Game");

      console.log("User registered:", user);
      


      onSubmit(userData);
    } catch (error) {
      console.error("Error during sign-up:", error);
  console.log("Error code:", error.code);   // Log the Firebase error code
  console.log("Error message:", error.message); // Log the Firebase error message
  setUserData({ ...userData, errorMessage: error.message || "Error during sign-up. Please try again." });
}
  };

  return (
    <>
      <Container>
        <FormContainer>
          <Title>Sign Up</Title>
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
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={userData.email}
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
            <FormGroup>
              <Label htmlFor="confirm-password">Confirm Password:</Label>
              <Input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <TermsLabel>
                <Input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={userData.agreeToTerms}
                  onChange={handleChange}
                />
                I agree to the{" "}
                <Link target="_blank" href="/ToS" passHref>
                  Terms of Service
                </Link>
              </TermsLabel>
            </FormGroup>
            <Button type="submit">Sign Up</Button>
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

export default SignIn;
