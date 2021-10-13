import loadingTypes from "./loading.types";

const INITIAL_STATE = {
  productDataLoaded: false,
  newMenProductsLoaded: false,
  newWomenProductsLoaded: false,
  productsLoaded: false,
  orderHistoryLoaded: false,
  orderDetailsLoaded: false,
  heroLoaded: false,
};

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loadingTypes.LOAD_PRODUCT_DATA:
      return {
        ...state,
        productDataLoaded: action.payload,
      };
    case loadingTypes.LOAD_NEW_MEN_PRODUCTS:
      return {
        ...state,
        newMenProductsLoaded: true,
      };
    case loadingTypes.LOAD_NEW_WOMEN_PRODUCTS:
      return {
        ...state,
        newWomenProductsLoaded: true,
      };
    case loadingTypes.LOAD_PRODUCTS:
      return {
        ...state,
        productsLoaded: action.payload,
      };
    case loadingTypes.LOAD_ORDER_HISTORY:
      return {
        ...state,
        orderHistoryLoaded: true,
      };
    case loadingTypes.LOAD_ORDER_DETAILS:
      return {
        ...state,
        orderDetailsLoaded: action.payload,
      };
    case loadingTypes.LOAD_HERO:
      return {
        ...state,
        heroLoaded: true,
      };
    default:
      return state;
  }
};

export default loadingReducer;
