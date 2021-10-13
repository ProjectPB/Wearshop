import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductStart,
  fetchProductsStart,
} from "../../redux/Products/products.actions";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import LoadMore from "./../LoadMore";
import Loading from "./../Loading";
import "./styles.scss";
import { loadProducts } from "../../redux/Loading/loading.actions";

const mapState = ({ productsData, loading }) => ({
  products: productsData.products,
  loaded: loading.productsLoaded,
});

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loaded } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchProductsStart({ pageSize }));

    return () => {
      dispatch(loadProducts(false));
    };
  }, [dispatch, pageSize]);

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
        pageSize,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return loaded ? (
    <div className="adminProducts">
      {data?.map((product, index) => {
        const { productName, productThumbnail, productPrice, documentID } =
          product;

        return (
          <div className="adminProduct" key={index}>
            <img src={productThumbnail} alt={productName} />
            <div className="info">
              <h2>{productName}</h2>
              <p>{productPrice} PLN</p>
            </div>
            <DeleteOutlineOutlined
              fontSize="large"
              className="delete"
              onClick={() => dispatch(deleteProductStart(documentID))}
            />
          </div>
        );
      })}

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  ) : (
    <div className="adminProducts">
      <div className="loadingContainer">
        <Loading />
      </div>
    </div>
  );
};

export default AdminProducts;
