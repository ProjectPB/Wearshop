import React, { useState } from "react";
import Select from "./../forms/Select";
import Input from "./../forms/Input";
import Button from "./../forms/Button";
import "./styles.scss";

const womenOptions = [
  {
    value: "a",
    name: "a",
  },
  {
    value: "b",
    name: "b",
  },
];

const menOptions = [
  {
    value: "c",
    name: "c",
  },
  {
    value: "d",
    name: "d",
  },
];

const NewProduct = () => {
  const [productCategory, setProductCategory] = useState("men");
  const [options, setOptions] = useState(menOptions);

  const handleTypeChange = (e) => {
    setProductCategory(e.target.value);

    if (options == menOptions) {
      setOptions(womenOptions);
    } else {
      setOptions(menOptions);
    }
  };

  return (
    <div className="newProductContainer">
      <div className="newProduct">
        <h2>Add new product</h2>
        <form>
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
            handleChange={handleTypeChange}
          />

          <Select label="Type" options={options} />

          <Input label="Name" type="text" />

          <Input label="Main image URL" type="url" />

          <Input
            label="Price"
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
          />

          <Button type="submit">Add product</Button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
