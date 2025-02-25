import Hero from "@/components/LandingPage/Hero";
import { styled } from "styled-components";
// import Navbar from "@/components/Dashboard/NavbarTest";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <link rel="icon" type="image/x-icon" href="./public/favicon.ico" />
      <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian&display=swap"
            rel="stylesheet"
          />

      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
