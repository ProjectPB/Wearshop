import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Select from "../../components/forms/Select";
import LoadMore from "../../components/LoadMore";
import Product from "./Product";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Products = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);
  const [pageSize, setPageSize] = useState(8);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType, pageSize }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/products/${nextFilter}`);
  };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Men",
        value: "men",
      },
      {
        name: "Women",
        value: "women",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
        pageSize,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results</p>
      </div>
    );
  }

  return (
    <div className="productsContainer">
      <h1>Products</h1>

      <Select {...configFilters} />

      <div className="products">
        {data.map((product, index) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            ...product,
          };

          return <Product key={index} {...configProduct} />;
        })}
      </div>
      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default Products;
