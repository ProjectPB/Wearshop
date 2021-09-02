import productsTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  newMenProducts: [],
  newWomenProducts: [],
  product: {},
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case productsTypes.SET_NEW_MEN_PRODUCTS:
      return {
        ...state,
        newMenProducts: action.payload,
      };
    case productsTypes.SET_NEW_WOMEN_PRODUCTS:
      return {
        ...state,
        newWomenProducts: action.payload,
      };
    case productsTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
