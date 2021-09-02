import React from "react";
import HomeProducts from "../../components/HomeProducts";
import Hero from "./../../components/Hero";
import "./styles.scss";

const Home = () => {
  const menProductsConfig = {
    title: "NEW MEN PRODUCTS",
    order: "desc",
    categoryFilter: "men",
    localStore: "newMenProducts",
  };

  const womenProductsConfig = {
    title: "NEW WOMEN PRODUCTS",
    order: "desc",
    categoryFilter: "women",
    localStore: "newWomenProducts",
  };

  return (
    <div className="homepage">
      <Hero />
      <HomeProducts {...menProductsConfig} />
      <HomeProducts {...womenProductsConfig} />
    </div>
  );
};

export default Home;
