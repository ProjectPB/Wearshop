import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "./default.scss";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ResetPassword from "./components/ResetPassword";

const App = () => {
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
                <SignUp />
              </MainLayout>
            )}
          />
          <Route
            path="/login"
            render={() => (
              <MainLayout>
                <SignIn />
              </MainLayout>
            )}
          />
          <Route
            path="/recover"
            render={() => (
              <MainLayout>
                <ResetPassword />
              </MainLayout>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
