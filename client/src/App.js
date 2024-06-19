import  {React, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import Cookies from 'js-cookie';
import PinnedNews from "./pages/PinnedNews";
import AddNews from './pages/AddNews';

function App() {
const Authenticated = Cookies.get("token")
console.log("this is my token "+ Authenticated);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/LogIn" element={Authenticated ?<Home/>:  <LogIn/> }/>
          <Route path="/PinnedNews" element={<PinnedNews/>} />
          <Route path="/AddNews" element={<AddNews/>} />
      </Routes>
    </BrowserRouter>

 

  );
}

export default App;