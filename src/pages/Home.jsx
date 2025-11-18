import { useState } from "react";
import Hero from "./../components/home/Hero";
import SectionCard from "./../components/home/SectionCard";
import Banner from "./../components/home/Banner";

function Home() {
  return (
    <>
      <Hero />
      <SectionCard />
      <Banner />
    </>
  );
}

export default Home;
