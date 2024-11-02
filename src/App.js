import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import LandingPage from "./Pages/LandingPage/LandingPage";
function App() {
  return (
    <>
      {/*  HEADER COMPONENT */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route
          path="/:videoId"
          element={<VideoPlayerPage />}
        /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
