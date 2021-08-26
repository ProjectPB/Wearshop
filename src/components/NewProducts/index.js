import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "./styles.scss";

function NewProducts() {
  return (
    <div className="newProductsContainer">
      <h1>NEW PRODUCTS</h1>

      <ScrollContainer className="newProducts">
        <div className="newProduct">
          <img
            src="https://images.unsplash.com/photo-1610384466709-9b83df910cc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            alt=""
          />
          <h2>HOODIE - "THE UNDERGROUND"</h2>
          <p>29.99 PLN</p>
        </div>
        <div className="newProduct">
          <img
            src="https://images.unsplash.com/photo-1610384466709-9b83df910cc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            alt=""
          />
          <h2>CAP - "MAGA"</h2>
          <p>29.99 PLN</p>
        </div>
        <div className="newProduct">
          <img
            src="https://images.unsplash.com/photo-1610384466709-9b83df910cc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            alt=""
          />
          <h2>CAP - "MAGA"</h2>
          <p>29.99 PLN</p>
        </div>
        <div className="newProduct">
          <img
            src="https://images.unsplash.com/photo-1610384466709-9b83df910cc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            alt=""
          />
          <h2>CAP - "MAGA"</h2>
          <p>29.99 PLN</p>
        </div>
        <div className="newProduct">
          <img
            src="https://images.unsplash.com/photo-1610384466709-9b83df910cc5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            alt=""
          />
          <h2>CAP - "MAGA"</h2>
          <p>29.99 PLN</p>
        </div>
      </ScrollContainer>
    </div>
  );
}

export default NewProducts;
