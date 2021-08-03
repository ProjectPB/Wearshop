import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchProductsStart,
  setProducts,
} from "../../redux/Products/products.actions";
import Select from "../../components/forms/Select";
import LoadMore from "../../components/LoadMore";
import Product from "./Product";
import "./styles.scss";
import {
  allOptions,
  categories,
  menOptions,
  womenOptions,
} from "../../utils/config";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Products = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryFilter, typeFilter } = useParams();
  const [typeOptions, setTypeOptions] = useState(allOptions);
  const { products } = useSelector(mapState);
  const pageSize = 8;

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ categoryFilter, typeFilter, pageSize }));
  }, [categoryFilter, typeFilter, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setProducts({}));
    };
  }, [dispatch]);

  useEffect(() => {
    switch (categoryFilter) {
      case undefined:
        setTypeOptions(allOptions);
        return;
      case "all":
        setTypeOptions(allOptions);
        return;
      case "men":
        setTypeOptions(menOptions);
        return;
      case "women":
        setTypeOptions(womenOptions);
        return;
      default:
        return;
    }
  }, [categoryFilter]);

  const handleCategoryFilter = (e) => {
    const filter = e.target.value;
    if (typeFilter) {
      history.push(`/products/${filter}/${typeFilter}`);
    } else {
      history.push(`/products/${filter}`);
    }
  };

  const handleTypeFilter = (e) => {
    const filter = e.target.value;

    if (!categoryFilter || categoryFilter === "all") {
      history.push(`/products/all/${filter}`);
    } else if (categoryFilter === "men") {
      history.push(`/products/men/${filter}`);
    } else if (categoryFilter === "women") {
      history.push(`/products/women/${filter}`);
    }
  };

  const configCategoryFilters = {
    defaultValue: categoryFilter,
    options: categories,
    handleChange: handleCategoryFilter,
  };

  const configTypeFilters = {
    defaultValue: typeFilter,
    options: typeOptions,
    handleChange: handleTypeFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        categoryFilter,
        typeFilter,
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
      <div className="productsContainer">
        <div className="noResults">
          <h1>Products</h1>
          <Select {...configCategoryFilters} />
          <Select {...configTypeFilters} />
          <p>No search results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="productsContainer">
      <h1>Products</h1>

      <Select {...configCategoryFilters} />
      <Select {...configTypeFilters} />

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
