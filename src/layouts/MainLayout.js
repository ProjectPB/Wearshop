import React from "react";
import { SnackbarProvider } from "notistack";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = (props) => {
  return (
    <div className="layout">
      <Header />
      <SnackbarProvider
        maxSnack={5}
        autoHideDuration={2000}
        style={{
          fontSize: "14px",
        }}
      >
        {props.children}
      </SnackbarProvider>
      <Footer />
    </div>
  );
};

export default MainLayout;
