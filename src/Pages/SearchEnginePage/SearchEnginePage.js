import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    // NAVIGATE TO PRODUCT LIST PAGE WITH PRODUCT LISTS OBJECT AS QUERY IN A FORM OF ENCODE STRING
    navigate(
      `/productListPage?data=${encodeURIComponent(
        JSON.stringify(productListsObject)
      )}`
    );
  };
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          value={searchInput}
          onChange={(event) => {
            handleSearchInput(event);
          }}
          placeholder="enter product name"
        ></input>
        <button
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
