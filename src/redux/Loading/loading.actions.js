import loadingTypes from "./loading.types";

export const loadProductData = () => ({
  type: loadingTypes.LOAD_PRODUCT_DATA,
});

export const loadNewMenProducts = () => ({
  type: loadingTypes.LOAD_NEW_MEN_PRODUCTS,
});

export const loadNewWomenProducts = () => ({
  type: loadingTypes.LOAD_NEW_WOMEN_PRODUCTS,
});

export const loadProducts = () => ({
  type: loadingTypes.LOAD_PRODUCTS,
});

export const loadAdminProducts = () => ({
  type: loadingTypes.LOAD_ADMIN_PRODUCTS,
});

export const loadOrderHistory = () => ({
  type: loadingTypes.LOAD_ORDER_HISTORY,
});

export const loadOrderDetails = () => ({
  type: loadingTypes.LOAD_ORDER_DETAILS,
});

export const loadHero = () => ({
  type: loadingTypes.LOAD_HERO,
});
