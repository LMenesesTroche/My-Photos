import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import Upload from "./views/upload";
import UserData from "./views/profile/index";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/" element={<Landing />} />
        <Route path="/userData" element={<UserData />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
