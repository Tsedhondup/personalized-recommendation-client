import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const SearchEnginePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = () => {
    const productListsObject = {
      productListsId: uuidv4(),
      productName: searchInput,
    };
    axios
      .post(`http://localhost:8080/newProducts`, productListsObject)
      .then((respond) => {
        console.log(respond);
        /*
         * AFTER SEARCH PRODUCT IS FETCHED AND ADDED TO CURRENT DATA BASE
         * NAVIGATE TO PRODUCT LISTS PAGE
         */
        navigate(
          `/ProductListsPage?data=${encodeURIComponent(
            JSON.stringify(productListsObject)
          )}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
    // NAVIGATE TO PRODUCT LIST PAGE WITH PRODUCT LISTS OBJECT AS QUERY IN A FORM OF ENCODE STRING
  };
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(event) => {
            handleSearchInput(event);
          }}
          placeholder="enter product name"
        ></input>
        <button
          type="submit"
          onClick={() => {
            handleFormSubmit();
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};
export default SearchEnginePage;
