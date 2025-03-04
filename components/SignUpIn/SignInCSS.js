// SignInCSS.js
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { signUp } from "@/backend/Auth";
import { useRouter } from "next/router";
import { useUser } from "@/components/StateContext/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/backend/Firebase";




const SignIn = ({ onSubmit }) => {
  const router = useRouter();
  const { setUserData } = useUser(); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  
  const [userData, setUserDataState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    errorMessage: "Error"
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataState({
      ...userData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; 
    // Prevent multiple submissions
    if (userData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      setIsSubmitting(false);
      return;
    }
    if (userData.username.trim().length > 20) {
      alert("username can't be bigger than 20 characters.");
      setIsSubmitting(false);
      return;
    }
  
    setIsSubmitting(true); 
    if (userData.password !== userData.confirmPassword) {
    
      setUserDataState({ ...userData, errorMessage: "Passwords do not match." });
      alert(userData.errorMessage)
      setIsSubmitting(false);

      return;
    }
    if (!userData.agreeToTerms) {
      setUserDataState({ ...userData, errorMessage: "You must agree to the Terms of Service." });
      alert(userData.errorMessage)
      return;
    }

    try {
      const userId = await signUp(userData.email, userData.password, userData.username, setUserData);
      const userDoc = await getDoc(doc(db, "users", userId));
      setUserData(userDoc.data());
  
      router.push("/Game");

      console.log("User registered:", user);
      


      onSubmit(userData);
    } catch (error) {
      console.error("Error during sign-up:", error);
      console.log("Error code:", error.code); 
      console.log("Error message:", error.message); 
      setUserDataState({ ...userData, errorMessage: error.message || "Error during sign-up. Please try again." });
      
}finally{
  setIsSubmitting(false); // Re-enable the button

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
          <Image src="/background.jpg"layout="fill" objectFit="cover"  />
      </ImageWrapperBlr>
      <ImageWrapper>
        <Image src="/background.jpg" layout="fill" objectFit="cover"  />
      </ImageWrapper>
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
