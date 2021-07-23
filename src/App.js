import React from "react";

import HomepageLayout from "./layouts/HomepageLayout";
import Home from "./pages/Home";
import "./default.scss";

const App = () => {
  return (
    <div>
      <HomepageLayout>
        <Home />
      </HomepageLayout>
    </div>
  );
};

export default App;
