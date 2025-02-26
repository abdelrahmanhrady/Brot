import HeroG from "@/components/GamingPage/Hero";
import { styled } from "styled-components";
// import Navbar from "@/components/Dashboard/NavbarTest";
import NavbarG from "@/components/GamingPage/Navbar";
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian&display=swap"
            rel="stylesheet"
          />

      <NavbarG />
      <HeroG />
    </>
  );
}
