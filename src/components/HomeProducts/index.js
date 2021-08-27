import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";
import "./styles.scss";
import {
  fetchProductsStart,
  setProducts,
} from "../../redux/Products/products.actions";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

function HomeProducts({ title, order }) {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  const { data } = products;
  const pageSize = 8;

  useEffect(() => {
    dispatch(fetchProductsStart({ pageSize, order }));
  }, [dispatch, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(setProducts({}));
    };
  }, [dispatch]);

  return (
    <div className="homeProductsContainer">
      <h1>{title}</h1>

      <ScrollContainer className="homeProducts">
        {data?.map((product, index) => {
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
                <p>{productPrice}</p>
              </div>
            </Link>
          );
        })}
      </ScrollContainer>
    </div>
  );
}

export default HomeProducts;
