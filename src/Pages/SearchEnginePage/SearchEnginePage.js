import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecommendationLists from "../../Components/RecommendationLists/RecommendationLists";

const SearchEnginePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = () => {
    axios
      .get(`http://localhost:8080/newProduct`, {
        params: {
          userId: JSON.parse(localStorage.getItem("pprSID*")).clientId,
          sessionId: JSON.parse(localStorage.getItem("pprSID*")).sessionId,
          currentSearch: searchInput,
        },
      })
      .then((respond) => {
        /*
         * AFTER SEARCH PRODUCT IS FETCHED AND ADDED TO CURRENT DATA BASE
         * NAVIGATE TO PRODUCT LISTS PAGE
         */
        navigate(
          `/ProductListsPage?data=${encodeURIComponent(
            JSON.stringify(respond.data.itemId)
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
      <form>
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
          onClick={(event) => {
            event.preventDefault();
            handleFormSubmit();
          }}
        >
          Search
        </button>
      </form>
      <RecommendationLists />
    </div>
  );
};
export default SearchEnginePage;
