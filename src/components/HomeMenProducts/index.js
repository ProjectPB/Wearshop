import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import { fetchNewMenProductsStart } from "../../redux/Products/products.actions";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  newMenProducts: productsData.newMenProducts.data,
});

const HomeMenProducts = ({ order, categoryFilter, localStore }) => {
  const dispatch = useDispatch();
  const { newMenProducts } = useSelector(mapState);
  const pageSize = 8;

  useEffect(() => {
    dispatch(
      fetchNewMenProductsStart({
        pageSize,
        order,
        categoryFilter,
        localStore,
      })
    );
  }, [dispatch, pageSize, order, categoryFilter, localStore]);

  return (
    <div className="homeProductsContainer">
      <h1>New Men Products</h1>

      <ScrollContainer className="homeProducts">
        {newMenProducts?.map((product, index) => {
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
};

export default HomeMenProducts;
