import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";

import MainLayout from "./layouts/MainLayout";

import WithAdminAuth from "./hoc/withAdminAuth";
import WithAuth from "./hoc/withAuth";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recover from "./pages/Recover";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import MyProfile from "./pages/MyProfile";
import "./default.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout>
                <Home />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/products"
            render={() => (
              <MainLayout>
                <Products />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/products/:categoryFilter"
            render={() => (
              <MainLayout>
                <Products />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/products/:categoryFilter/:typeFilter"
            render={() => (
              <MainLayout>
                <Products />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/product/:productID"
            render={() => (
              <MainLayout>
                <Product />
              </MainLayout>
            )}
          />
          <Route
            path="/cart"
            render={() => (
              <MainLayout>
                <Cart />
              </MainLayout>
            )}
          />
          <Route
            path="/payment"
            render={() => (
              <WithAuth>
                <MainLayout>
                  <Payment />
                </MainLayout>
              </WithAuth>
            )}
          />
          <Route
            path="/profile"
            render={() => (
              <WithAuth>
                <MainLayout>
                  <MyProfile />
                </MainLayout>
              </WithAuth>
            )}
          />
          <Route
            path="/register"
            render={() => (
              <MainLayout>
                <Register />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
          <Route
            path="/recover"
            render={() => (
              <MainLayout>
                <Recover />
              </MainLayout>
            )}
          />
          <Route
            path="/admin"
            render={() => (
              <WithAdminAuth>
                <MainLayout>
                  <Admin />
                </MainLayout>
              </WithAdminAuth>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
