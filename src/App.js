import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import PreferencesFormPage from "./Pages/PreferencesFormPage/PreferencesFormPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
function App() {
  return (
    <>
      {/*  HEADER COMPONENT */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
