import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenImg from "./../../assets/men.jpg";
import WomenImg from "./../../assets/women.jpg";
import { loadHero } from "./../../redux/Loading/loading.actions";
import Loading from "./../Loading";
import "./styles.scss";

const mapState = ({ loading }) => ({
  loaded: loading.heroLoaded,
});

const Hero = () => {
  const dispatch = useDispatch();
  const { loaded } = useSelector(mapState);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    if (imagesLoaded === 2 && !loaded) {
      dispatch(loadHero());
    }
  }, [imagesLoaded, dispatch, loaded]);

  return (
    <div className="heroContainer">
      {!loaded && <Loading />}
      <div
        className={"hero"}
        style={loaded ? {} : { visibility: "hidden", height: "0" }}
      >
        <div className="navImg">
          <Link to="/products/women">
            <img
              src={WomenImg}
              alt="Women"
              onLoad={() => setImagesLoaded(imagesLoaded + 1)}
            />
            <h1>Women</h1>
          </Link>
        </div>
        <div className="navImg">
          <Link to="/products/men">
            <img
              src={MenImg}
              alt="Men"
              onLoad={() => setImagesLoaded(imagesLoaded + 1)}
            />
            <h1>Men</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
