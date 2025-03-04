import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/components/StateContext/UserContext";
import { useUploadUserData } from "@/backend/Save";
import { signOut } from "@/backend/Auth";
import { useRouter } from "next/router";

const NavbarG = () => {
  const { userData, setUserData } = useUser();
  const [passiveCost, setPassiveCost] = useState(0);
  const [passiveRate, setPassiveRate] = useState(0);
  const [money, setMoney] = useState(0);
  const [userId, setUserId] = useState(null);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [totalPassiveCollected, setTotalPassiveCollected] = useState(0);
  const router = useRouter();

  function stringNumConversion(num) {
    let result;

    if (num >= 1_000_000_000_000) {
      result = (num / 1_000_000_000_000).toFixed(2) + "t";
    } else if (num >= 1_000_000_000) {
      result = (num / 1_000_000_000).toFixed(2) + "b";
    } else if (num >= 1_000_000) {
      result = (num / 1_000_000).toFixed(2) + "m";
    } else if (num >= 1_000) {
      result = (num / 1_000).toFixed(2) + "k";
    } else {
      result = num.toString();
    }

    return result;
  }

  useEffect(() => {
    if (userData) {
      setMoney(userData.money);
      const rate = 2 ** userData.passiveLevel;
      setPassiveRate(rate);
      setPassiveCost(rate ** 2);
      setPassiveIncome(userData.passiveIncome || 0);
      setTotalPassiveCollected(userData.TotalPassiveCollected);
    }
  }, [userData]);

  useEffect(() => {
    let intervalId;

    if (userData) {
      intervalId = setInterval(() => {
        setUserData((prevData) => {
          if (!prevData) return prevData;

          const currentRate = 2 ** prevData.passiveLevel;
          const newPassiveIncome = (prevData.passiveIncome || 0) + currentRate;

          return {
            ...prevData,
            passiveIncome: newPassiveIncome,
          };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [userData?.passiveLevel]);
  useUploadUserData(userId, userData);

  if (!userData) {
    return <LoadingScreen />;
  }

  function passiveCollect() {
    setUserData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        money: prev.money + (prev.passiveIncome || 0),
        TotalPassiveCollected:
          prev.TotalPassiveCollected + (prev.passiveIncome || 0),
        passiveIncome: 0,
      };
    });
  }
  function passiveUpgrade() {
    setUserData((prev) => {
      if (!prev) return prev;
      const currentLevel = prev.passiveLevel;
      const upgradeCost = (2 ** currentLevel) ** 2;
      if (prev.money >= upgradeCost) {
        return {
          ...prev,

          money: prev.money - upgradeCost,
          passiveLevel: currentLevel + 1,
        };
      } else {
        alert("Not enough money");
      }

      return prev;
    });
  }
  function handlesignOut() {
    signOut(setUserData);
    router.push("/");
  }

  return (
    <>
      <Box>
        <ImageWrapper>
          <Image src="/BRlogo.png" width={106} height={76} />
        </ImageWrapper>

        <PokerChips>
          <Image src="/PokerChips.png" width={53} height={38} />
        </PokerChips>
        <HeadText>: {stringNumConversion(money)}</HeadText>

        <BoxSignUp onClick={handlesignOut}>Sign Out</BoxSignUp>

        <BoxPassiveCollect onClick={passiveCollect}>
          Collect Passive ‎<br></br>
          {stringNumConversion(passiveRate)}$/s:{" "}
          {stringNumConversion(passiveIncome)}$
        </BoxPassiveCollect>

        <BoxPassiveLevel onClick={passiveUpgrade}>
          Upgrade Passive ‎<br></br>cost: {stringNumConversion(passiveCost)}$
        </BoxPassiveLevel>
      </Box>
    </>
  );
};

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: gold;
  font-size: 2rem;
`;

const HeadText = styled.h1`
  text-shadow: 1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black,
    -1px 1px 0px black;

  position: absolute;
  top: 25%;
  left: 45%;
  width: auto;
  height: 87px;

  color: rgb(255, 215, 0);
  font-size: 32px;
  font-family: "Noto Sans Georgian";
  font-weight: 700;
  text-align: center;
  text-rendering: geometricPrecision;
  caret-color: rgb(255, 215, 0);
  text-decoration: none;
  letter-spacing: 0px;
`;

const Box = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 99px;
  background: rgb(51, 0, 0);
  border-radius: 0px;
`;

const PokerChips = styled.div`
  position: absolute;
  left: 39%;
  top: 20%;
  width: 136px;
  height: 76px;
  border-radius: 0px;
  padding: 10px 30px;
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

const BoxPassiveCollect = styled.div`
  font-family: "Noto Sans Georgian", sans-serif;
  display: inline-block;
  text-decoration: none;
  color: black;
  padding: 7px 28px;
  font-size: 12px;
  background: rgb(0, 255, 42);
  position: absolute;
  cursor: pointer;
  left: 11%;
  top: 24px;
  font-weight: bold;

  border: 2px solid rgb(0, 0, 0);
  border-radius: 15px;

  &:hover {
    border: 2px solid rgb(0, 0, 0);
    background: rgb(0, 215, 36);
    transition: 0.5s;
  }
`;

const BoxPassiveLevel = styled.div`
  font-family: "Noto Sans Georgian", sans-serif;
  display: inline-block;
  text-decoration: none;
  color: black;
  padding: 7px 28px;
  font-size: 12px;
  background: rgb(255, 215, 0);
  position: absolute;
  cursor: pointer;
  left: 25%;
  top: 24px;
  font-weight: bold;

  border: 2px solid rgb(0, 0, 0);
  border-radius: 15px;

  &:hover {
    border: 2px solid rgb(0, 0, 0);
    background: rgb(208, 177, 0);
    transition: 0.5s;
  }
`;

const BoxSignUp = styled.div`
  font-family: "Noto Sans Georgian", sans-serif;
  display: inline-block;
  text-decoration: none;
  color: black;
  padding: 7px 28px;
  font-size: 18px;
  background: rgb(255, 215, 0);
  position: absolute;
  cursor: pointer;
  left: 90%;
  top: 24px;
  font-weight: bold;

  border: 2px solid rgb(0, 0, 0);
  border-radius: 15px;

  &:hover {
    border: 2px solid rgb(0, 0, 0);
    background: rgb(208, 177, 0);
    transition: 0.5s;
  }
`;

export default NavbarG;
