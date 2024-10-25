import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import Upload from "./views/upload";
import UserData from "./views/profile/index";
import AllUsers from "./views/allUsers";
import PublicProfile from "./views/publicProfile";
import Dashboard from "./views/dashboard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/" element={<Landing />} />
        <Route path="/userData" element={<UserData />} />
        <Route path="/allUsers" element={<AllUsers />} />
        <Route path="/profile/:id" element={<PublicProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
