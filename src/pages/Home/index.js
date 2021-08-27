import React from "react";
import HomeProducts from "../../components/HomeProducts";
import Hero from "./../../components/Hero";
import "./styles.scss";

const Home = () => {
  const newProductsConfig = {
    title: "NEW PRODUCTS",
    order: "desc",
  };

  return (
    <div className="homepage">
      <Hero />
      <HomeProducts {...newProductsConfig} />
    </div>
  );
};

export default Home;
