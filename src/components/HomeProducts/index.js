import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  fetchNewMenProductsStart,
  fetchNewWomenProductsStart,
  setNewMenProducts,
  setNewWomenProducts,
} from "../../redux/Products/products.actions";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  newMenProducts: productsData.newMenProducts,
  newWomenProducts: productsData.newWomenProducts,
});

function HomeProducts({ title, order, categoryFilter, localStore }) {
  const dispatch = useDispatch();
  const { newMenProducts, newWomenProducts } = useSelector(mapState);
  const [items, setItems] = useState();
  const pageSize = 8;

  useEffect(() => {
    switch (localStore) {
      case "newMenProducts":
        setItems(newMenProducts.data);
        dispatch(
          fetchNewMenProductsStart({
            pageSize,
            order,
            categoryFilter,
            localStore,
          })
        );
        break;
      case "newWomenProducts":
        setItems(newWomenProducts.data);
        dispatch(
          fetchNewWomenProductsStart({
            pageSize,
            order,
            categoryFilter,
            localStore,
          })
        );
        break;
      default:
        break;
    }
  }, [
    dispatch,
    pageSize,
    order,
    categoryFilter,
    localStore,
    newMenProducts.data,
    newWomenProducts.data,
  ]);

  useEffect(() => {
    return () => {
      dispatch(setNewMenProducts({}));
      dispatch(setNewWomenProducts({}));
    };
  }, [dispatch]);

  return (
    <div className="homeProductsContainer">
      <h1>{title}</h1>

      <ScrollContainer className="homeProducts">
        {items?.map((product, index) => {
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
    </div>
  );
}

export default HomeProducts;
