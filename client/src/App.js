import React from 'react';
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Map from "./layout/Map";
import Navbars from './layout/Navbars';
function App() {
  return (
    <div>
      <Navbars></Navbars>
      <Map></Map>
    </div>

 

  );
}

export default App;