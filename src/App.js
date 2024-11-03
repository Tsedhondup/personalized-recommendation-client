import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import PreferencesFormPage from "./Pages/PreferencesFormPage/PreferencesFormPage";
import ShoppingPage from "./Pages/ShoppingPage/ShoppingPage";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
function App() {
  return (
    <>
      {/*  HEADER COMPONENT */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PreferencesFormPage />} />
          <Route path="/landing" element={<ShoppingPage />} />
          <Route path="/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
