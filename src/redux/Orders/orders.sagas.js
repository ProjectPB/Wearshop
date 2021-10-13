import { takeLatest, put, all, call } from "redux-saga/effects";
import ordersTypes from "./orders.types";
import {
  handleGetOrder,
  handleGetUserOrderHistory,
  handleSaveOrder,
} from "./orders.helpers";
import { setOrderDetails, setUserOrderHistory } from "./orders.actions";
import {
  loadOrderDetails,
  loadOrderHistory,
} from "./../Loading/loading.actions";
import { clearCart } from "./../Cart/cart.actions";
import { auth } from "./../../firebase/utils";

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });
    yield put(clearCart());
  } catch (err) {
    // console.log(err);
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
    yield put(loadOrderHistory());
  } catch (err) {
    // console.log(err);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    yield put(setOrderDetails(order));
    yield put(loadOrderDetails(true));
  } catch (err) {
    // console.log(err);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ]);
}
