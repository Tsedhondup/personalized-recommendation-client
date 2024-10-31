import { useState } from "react";
import axios from "axios";

const SearchForm = (props) => {
  const [productName, setProductName] = useState(""); // Controll form should not have undefined value initialy
  const handleProductName = (e) => {
    setProductName(e.target.value);
  };
  const handleFormSubmission = () => {
    props.setProductLists([]);
    axios
      .get(`http://localhost:8080/products`, {
        params: {
          productName: productName,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        props.setProductLists(respond.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleFormSubmission();
        }}
      >
        <input
          type="text"
          value={productName}
          onChange={(e) => {
            handleProductName(e);
          }}
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default SearchForm;
