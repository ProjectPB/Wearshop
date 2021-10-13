import loadingTypes from "./loading.types";

export const loadProductData = (state) => ({
  type: loadingTypes.LOAD_PRODUCT_DATA,
  payload: state,
});

export const loadNewMenProducts = () => ({
  type: loadingTypes.LOAD_NEW_MEN_PRODUCTS,
});

export const loadNewWomenProducts = () => ({
  type: loadingTypes.LOAD_NEW_WOMEN_PRODUCTS,
});

export const loadProducts = (state) => ({
  type: loadingTypes.LOAD_PRODUCTS,
  payload: state,
});

export const loadOrderHistory = () => ({
  type: loadingTypes.LOAD_ORDER_HISTORY,
});

export const loadOrderDetails = (state) => ({
  type: loadingTypes.LOAD_ORDER_DETAILS,
  payload: state,
});

export const loadHero = () => ({
  type: loadingTypes.LOAD_HERO,
});
