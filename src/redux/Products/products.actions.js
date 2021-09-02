import productsTypes from "./products.types";

export const addProductStart = (productData) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters,
});

export const fetchNewMenProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_NEW_MEN_PRODUCTS_START,
  payload: filters,
});

export const fetchNewWomenProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_NEW_WOMEN_PRODUCTS_START,
  payload: filters,
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const setNewMenProducts = (products) => ({
  type: productsTypes.SET_NEW_MEN_PRODUCTS,
  payload: products,
});

export const setNewWomenProducts = (products) => ({
  type: productsTypes.SET_NEW_WOMEN_PRODUCTS,
  payload: products,
});

export const deleteProductStart = (productID) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID,
});

export const fetchProductStart = (productID) => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: productID,
});

export const setProduct = (product) => ({
  type: productsTypes.SET_PRODUCT,
  payload: product,
});
