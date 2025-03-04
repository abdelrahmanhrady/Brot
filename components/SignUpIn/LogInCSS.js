
import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { logIn } from "@/backend/Auth";
import { db } from "@/backend/Firebase";
import { useRouter } from "next/router";
import { useUser } from "@/components/StateContext/UserContext";
import { doc, getDoc } from "firebase/firestore";


const LogIn = () => {
  const { userData: contextUserData, setUserData } = useUser(); 

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const router = useRouter();

  const [userData, setUserDataState] = useState({
    usernameOrEmail: "",
    password: "",
  });

   useEffect(() => {
     if (contextUserData) {
       router.push("/Game");
     }
   }, [contextUserData, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataState({
      ...userData,
      [name]: value,
    });
   
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const usernameOrEmail = userData.usernameOrEmail;
    try {

      const userCredential = await logIn(userData.usernameOrEmail, userData.password); 
      const userId = userCredential.user.uid;  
      const userDoc = await getDoc(doc(db, "users", userId));
      setUserData({
        uid: userId,
        ...userDoc.data()
      });


      router.push("/Game");
    } catch (err) {
      setError("Error logging in: " + err.message);
      
    } finally {
      setLoading(false);
      console.log("Email after login attempt: ", userData.usernameOrEmail);

    }
  };

  return (
    <>
      <Container>
        <FormContainer>
          <Title>Log In</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="usernameOrEmail">Username:</Label>

              <Input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={userData.usernameOrEmail}
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
        <Image src="/background.jpg" layout="fill" objectFit="cover"  />
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


export default LogIn;
