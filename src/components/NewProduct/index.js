import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductStart } from "../../redux/Products/products.actions";
import Select from "./../forms/Select";
import Input from "./../forms/Input";
import Button from "./../forms/Button";
import { CKEditor } from "ckeditor4-react";
import "./styles.scss";

const womenOptions = [
  {
    value: "tshirt",
    name: "T-Shirt",
  },
  {
    value: "jeans",
    name: "Jeans",
  },
  {
    value: "hoodie",
    name: "Hoodie",
  },
  {
    value: "dress",
    name: "Dress",
  },
  {
    value: "other",
    name: "Other",
  },
];

const menOptions = [
  {
    value: "tshirt",
    name: "T-Shirt",
  },
  {
    value: "jeans",
    name: "Jeans",
  },
  {
    value: "hoodie",
    name: "Hoodie",
  },
  {
    value: "cap",
    name: "Cap",
  },
];

const NewProduct = () => {
  const dispatch = useDispatch();
  const [productCategory, setProductCategory] = useState("men");
  const [productType, setProductType] = useState("tshirt");
  const [options, setOptions] = useState(menOptions);
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    switch (productCategory) {
      case "men":
        setOptions(menOptions);
        return;
      case "women":
        setOptions(womenOptions);
        return;
    }
  }, [productCategory]);

  const resetForm = () => {
    setProductCategory("men");
    setProductType("tshirt");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productName,
        productCategory,
        productType,
        productThumbnail,
        productPrice,
        productDescription,
      })
    );

    resetForm();
  };

  return (
    <div className="newProductContainer">
      <div className="newProduct">
        <h2>Add new product</h2>
        <form onSubmit={handleSubmit}>
          <Select
            label="Category"
            options={[
              {
                value: "men",
                name: "Men",
              },
              {
                value: "women",
                name: "Women",
              },
            ]}
            value={productCategory}
            handleChange={(e) => setProductCategory(e.target.value)}
          />

          <Select
            label="Type"
            options={options}
            value={productType}
            handleChange={(e) => setProductType(e.target.value)}
          />

          <Input
            label="Name"
            type="text"
            value={productName}
            handleChange={(e) => setProductName(e.target.value)}
          />

          <Input
            label="Main image URL"
            type="url"
            value={productThumbnail}
            handleChange={(e) => setProductThumbnail(e.target.value)}
          />

          <Input
            label="Price"
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
            value={productPrice}
            handleChange={(e) => setProductPrice(e.target.value)}
          />

          <p>Description</p>
          <CKEditor
            className="editor"
            onChange={(evt) => setProductDescription(evt.editor.getData())}
          />

          <Button type="submit">Add product</Button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
