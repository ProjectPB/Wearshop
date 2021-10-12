import React from "react";
import HomeMenProducts from "../../components/HomeMenProducts";
import HomeWomenProducts from "../../components/HomeWomenProducts";
import Hero from "./../../components/Hero";
import "./styles.scss";

const Home = () => {
  const menProductsConfig = {
    order: "desc",
    categoryFilter: "men",
    localStore: "newMenProducts",
  };

  const womenProductsConfig = {
    order: "desc",
    categoryFilter: "women",
    localStore: "newWomenProducts",
  };

  return (
    <div className="homepage">
      <Hero />
      <HomeMenProducts {...menProductsConfig} />
      <HomeWomenProducts {...womenProductsConfig} />
    </div>
  );
};

export default Home;
