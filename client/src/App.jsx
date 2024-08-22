import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./views/landing";
import Navbar from "./components/nav";
import Footer from "./components/footer";
import Upload from "./views/upload";
import Login from "./views/login";
import Register from "./views/register";
import UserData from "./views/profile/index"
import { useEffect } from "react";
import { gapi } from "gapi-script";
const clientId =
  "913811512322-mif9shii3k76dkvt2hjepmj4ks934nh7.apps.googleusercontent.com";

function App() {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope:""
      })
    };
    gapi.load("client:auth2", start)
  })
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userData" element={<UserData />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
