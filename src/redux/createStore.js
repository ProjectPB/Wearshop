import { createStore, applyMiddleware } from "redux";
import createSagaMiddle from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();
export const middlewares = [sagaMiddleware, thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

const reduxItems = { store, persistor };

export default reduxItems;
