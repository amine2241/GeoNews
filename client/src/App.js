import React from 'react';
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Map from "./layout/Map";
function App() {
  return (
    <div className="h-screen">
    <Map/>
    </div>

 

  );
}

export default App;