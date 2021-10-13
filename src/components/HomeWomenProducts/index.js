import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import { fetchNewWomenProductsStart } from "../../redux/Products/products.actions";
import "./styles.scss";
import Loading from "../Loading";

const mapState = ({ productsData, loading }) => ({
  newWomenProducts: productsData.newWomenProducts.data,
  loaded: loading.newWomenProductsLoaded,
});

const HomeWomenProducts = ({ order, categoryFilter, localStore }) => {
  const dispatch = useDispatch();
  const { newWomenProducts, loaded } = useSelector(mapState);
  const pageSize = 8;

  useEffect(() => {
    !loaded &&
      dispatch(
        fetchNewWomenProductsStart({
          pageSize,
          order,
          categoryFilter,
          localStore,
        })
      );
  }, [dispatch, pageSize, order, categoryFilter, localStore, loaded]);

  return (
    <div className="homeProductsContainer">
      <h1>New Women Products</h1>

      {loaded ? (
        <ScrollContainer className="homeProducts">
          {newWomenProducts?.map((product, index) => {
            const { documentID, productThumbnail, productName, productPrice } =
              product;
            if (
              !productThumbnail ||
              !productName ||
              typeof productPrice === "undefined"
            )
              return null;

            return (
              <Link to={`/product/${documentID}`} key={index}>
                <div className="homeProduct">
                  <img src={productThumbnail} alt={productName} />
                  <h2>{productName}</h2>
                  <p>{productPrice} PLN</p>
                </div>
              </Link>
            );
          })}
        </ScrollContainer>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default HomeWomenProducts;
