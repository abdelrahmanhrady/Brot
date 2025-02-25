// SignInCSS.js
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

// SignIn Component
const SignIn = ({ onSubmit }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(userData); 
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
      <ImageWrapper>
        <Image src="/storageimg.jpg" width={1555} height={770} />
      </ImageWrapper>
    </>
  );
};

const ImageWrapper = styled.div`
  filter: blur(40px);
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
    border-color: #3498db;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2980b9;
  }
`;
const TermsLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;

  a {
    color: #3498db;
    text-decoration: none;
  }
`;

export default SignIn;
