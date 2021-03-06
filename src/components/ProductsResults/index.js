import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchProductsStart,
  setProducts,
} from "../../redux/Products/products.actions";
import Select from "../forms/Select";
import LoadMore from "../LoadMore";
import ProductCard from "../ProductCard";
import Loading from "./../Loading";
import "./styles.scss";
import {
  allOptions,
  categories,
  menOptions,
  womenOptions,
} from "../../utils/config";
import { loadProducts } from "../../redux/Loading/loading.actions";

const mapState = ({ productsData, loading }) => ({
  products: productsData.products,
  loaded: loading.productsLoaded,
});

const ProductsResults = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryFilter = "all", typeFilter = "" } = useParams();
  const [typeOptions, setTypeOptions] = useState(allOptions);
  const { products, loaded } = useSelector(mapState);
  const [pageSize, setPageSize] = useState(8);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    if (window.innerWidth <= 992 && window.innerWidth > 768) {
      setPageSize(9);
    }

    dispatch(loadProducts(false));
    dispatch(fetchProductsStart({ categoryFilter, typeFilter, pageSize }));
  }, [categoryFilter, typeFilter, dispatch, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(setProducts({}));
      dispatch(loadProducts(false));
    };
  }, [dispatch]);

  useEffect(() => {
    switch (categoryFilter) {
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
    label: "Category",
    defaultValue: categoryFilter,
    options: categories,
    handleChange: handleCategoryFilter,
  };

  const configTypeFilters = {
    label: "Type",
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

  return (
    <div className="productsResultsContainer">
      <div className="filters">
        <Select {...configCategoryFilters} />
        <Select {...configTypeFilters} />
      </div>
      {loaded ? (
        <div className="productsResults">
          {data?.length < 1 && <p className="noResults">No search results</p>}
          {data?.map((product, index) => {
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

            return <ProductCard key={index} {...configProduct} />;
          })}
          {!isLastPage && <LoadMore {...configLoadMore} />}
        </div>
      ) : (
        <div className="loadingContainer">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ProductsResults;
