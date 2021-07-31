import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import productsReducer from "./Products/products.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productsReducer,
});

export default rootReducer;
