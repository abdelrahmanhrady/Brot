import Hero from "@/components/LandingPage/Hero";
import { styled } from "styled-components";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";


export default function Home() {
  return (
    <>
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
