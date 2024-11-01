import SearchForm from "../../Components/SearchForm/SearchForm";
// import InitialData from "../../Components/InitialDatas/InitialDatas";
import { useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";
import RecommendationLists from "../../Components/RecommendationLists/RecommendationLists";

const LandingPage = () => {
  const [productLists, setProductLists] = useState([]);
  return (
    <div>
      <SearchForm setProductLists={setProductLists} />
      <ProductList productLists={productLists} />
      <RecommendationLists />
    </div>
  );
};
export default LandingPage;
