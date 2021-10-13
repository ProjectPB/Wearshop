import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  fetchProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import { addProduct } from "../../redux/Cart/cart.actions";
import Button from "./../forms/Button";
import Loading from "./../Loading";
import "./styles.scss";
import { loadProductData } from "../../redux/Loading/loading.actions";

const mapState = ({ productsData, loading }) => ({
  product: productsData.product,
  loaded: loading.productDataLoaded,
});

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product, loaded } = useSelector(mapState);
  const { enqueueSnackbar } = useSnackbar();

  const { productName, productThumbnail, productPrice, productDescription } =
    product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
      dispatch(loadProductData(false));
    };
  }, [dispatch, productID]);

  const handleAddToCart = (product, variant) => {
    if (!product) return;
    dispatch(addProduct(product));

    enqueueSnackbar(`${productName} added to cart.`, { variant });
  };

  const configAddToCartBtn = {
    type: "button",
  };

  return loaded ? (
    <div className="productDetailsContainer">
      <div className="productDetails">
        <div className="imageContainer">
          <img src={productThumbnail} alt={productName} />
        </div>

        <div className="details">
          <h1>{productName}</h1>
          <p>{productPrice} PLN</p>
          <Button
            {...configAddToCartBtn}
            onClick={() => handleAddToCart(product, "success")}
          >
            Add to cart
          </Button>
          {productDescription && (
            <span dangerouslySetInnerHTML={{ __html: productDescription }} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ProductDetails;
