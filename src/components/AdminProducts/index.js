import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductStart,
  fetchProductsStart,
} from "../../redux/Products/products.actions";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import LoadMore from "./../LoadMore";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="adminProducts">
      {Array.isArray(data) &&
        data.length > 0 &&
        data?.map((product, index) => {
          const { productName, productThumbnail, productPrice, documentID } =
            product;

          return (
            <div className="product" key={index}>
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
  );
};

export default AdminProducts;