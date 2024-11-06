import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import PreferencesFormPage from "./Pages/PreferencesFormPage/PreferencesFormPage";
import ShoppingPage from "./Pages/ShoppingPage/ShoppingPage";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import SearchEnginePage from "./Pages/SearchEnginePage/SearchEnginePage";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";
import ProductListsPage from "./Pages/ProductListsPage/ProductListsPage";
function App() {
  return (
    <>
      {/*  HEADER COMPONENT */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PreferencesFormPage />} />
          <Route path="/shop" element={<ShoppingPage />} />
          <Route path="/:productId" element={<ProductDetails />} />
          <Route path="/SearchEnginePage" element={<SearchEnginePage />} />
          <Route path="/ProductListsPage" element={<ProductListsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
