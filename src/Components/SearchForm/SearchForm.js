import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./SearchForm.scss";

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = () => {
    const productListsObject = {
      productListsId: uuidv4(),
      productName: searchInput,
      userId: sessionStorage.getItem("userId"),
    };
    axios
      .post(`http://localhost:8080/newProducts`, productListsObject)
      .then((respond) => {
        if (respond.data.status === "SEARCH COMPLETED") {
          navigate(
            `/ProductListsPage?data=${encodeURIComponent(
              JSON.stringify(productListsObject)
            )}`
          );
        }
        /*
         * AFTER SEARCH PRODUCT IS FETCHED AND ADDED TO CURRENT DATA BASE
         * NAVIGATE TO PRODUCT LISTS PAGE
         */
      })
      .catch((err) => {
        console.log(err);
      });
    // NAVIGATE TO PRODUCT LIST PAGE WITH PRODUCT LISTS OBJECT AS QUERY IN A FORM OF ENCODE STRING
  };
  return (
    <div className="form-container">
      <form className="form-container__form">
        <input
          className="form-container__form--input"
          type="text"
          value={searchInput}
          onChange={(event) => {
            handleSearchInput(event);
          }}
          placeholder="enter product name"
        ></input>
        <button
          className="form-container__form--button"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            handleFormSubmit();
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};
export default SearchForm;
