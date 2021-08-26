import React from "react";
import NewProducts from "../../components/NewProducts";
import Hero from "./../../components/Hero";
import "./styles.scss";

const Home = () => {
  return (
    <div className="homepage">
      <Hero />
      <NewProducts />
    </div>
  );
};

export default Home;
