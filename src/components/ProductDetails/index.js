import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import "./styles.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product } = useSelector(mapState);

  const { productName, productThumbnail, productPrice, productDescription } =
    product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  return (
    <div className="productDetailsContainer">
      <div className="productDetails">
        <img src={productThumbnail} alt={productName} />

        <div className="details">
          <h1>{productName}</h1>
          <p>{productPrice} PLN</p>
          {productDescription && (
            <span dangerouslySetInnerHTML={{ __html: productDescription }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
