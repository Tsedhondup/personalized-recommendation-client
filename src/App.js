import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import PreferencesFormPage from "./Pages/PreferencesFormPage/PreferencesFormPage";
import SearchEnginePage from "./Pages/SearchEnginePage/SearchEnginePage";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage";
import ProductListsPage from "./Pages/ProductListsPage/ProductListsPage";
// import MainPersonalizedDetailPage from "./Pages/mainPersonalizedDetailPage/MainPersonalizedDetailPage";
import MainPersonalizedDetailPage from "./Pages/MainPersonalizedDetailPage/MainPersonalizedDetailPage";
function App() {
  return (
    <>
      {/*  HEADER COMPONENT */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PreferencesFormPage />} />
          <Route path="/productDetailPage" element={<ProductDetailPage />} />
          <Route path="/SearchEnginePage" element={<SearchEnginePage />} />
          <Route path="/ProductListsPage" element={<ProductListsPage />} />
          <Route
            path="/mainPersonalizedDetailPage"
            element={<MainPersonalizedDetailPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
