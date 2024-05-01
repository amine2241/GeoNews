import  React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/LogIn" element={<LogIn/>} />
      </Routes>
    </BrowserRouter>

 

  );
}

export default App;