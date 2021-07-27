import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";

import MainLayout from "./layouts/MainLayout";

import WithAdminAuth from "./hoc/withAdminAuth";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recover from "./pages/Recover";
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
