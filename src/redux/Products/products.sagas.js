import { auth } from "./../../firebase/utils";
import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  setProducts,
  fetchProductsStart,
  setProduct,
  setNewWomenProducts,
  setNewMenProducts,
} from "./products.actions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleFetchProduct,
} from "./products.helpers";
import productsTypes from "./products.types";
import {
  loadNewMenProducts,
  loadNewWomenProducts,
} from "../Loading/loading.actions";

export function* addProduct({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      ...payload,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (err) {
    // console.log(err);
  }
}
export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* fetchNewMenProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setNewMenProducts(products));
    yield put(loadNewMenProducts());
  } catch (err) {
    // console.log(err);
  }
}
export function* onFetchNewMenProductsStart() {
  yield takeLatest(
    productsTypes.FETCH_NEW_MEN_PRODUCTS_START,
    fetchNewMenProducts
  );
}

export function* fetchNewWomenProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setNewWomenProducts(products));
    yield put(loadNewWomenProducts());
  } catch (err) {
    // console.log(err);
  }
}
export function* onFetchNewWomenProductsStart() {
  yield takeLatest(
    productsTypes.FETCH_NEW_WOMEN_PRODUCTS_START,
    fetchNewWomenProducts
  );
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err)
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onFetchNewMenProductsStart),
    call(onFetchNewWomenProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ]);
}
