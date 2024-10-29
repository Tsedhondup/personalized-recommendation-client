import SearchForm from "../../Components/SearchForm/SearchForm";
// import InitialData from "../../Components/InitialDatas/InitialDatas";
import { useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";

const LandingPage = () => {
  const [productLists, setProductLists] = useState([]);
  return (
    <div>
      <SearchForm setProductLists={setProductLists} />
      <ProductList productLists={productLists} />
    </div>
  );
};
export default LandingPage;
