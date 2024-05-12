import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import Drawer from './Drawer';
import { useRef, useState, useEffect } from 'react';

export default function Map({clickState}){
    const [mapClicked, setMapClicked ] = useState(false); 


    const geoJsonMarkerOptions ={
        radius:5,
        fillColor: "#0000FF",
        color:"#0000",
        weight: 2,
        opacity:35,
        fillOpacity:0.8
    }
    const marker = useRef(null);

    const LocationFinder = () => {
        const map = useMapEvents({
                click(e) {
                    console.log("this is marker "+ marker);
                if(marker.current){
                    map.removeLayer(marker.current);
            
                }
                const val = !mapClicked;
                setMapClicked(val);
                console.log("mapClicked" +mapClicked);
           
        
           
                 console.log(e.latlng);
                var mapdata = L.geoJSON(mapdata).addTo(map);
                marker.current = new L.circleMarker(
                    L.latLng(
                        parseFloat(e.latlng.lat),
                        parseFloat(e.latlng.lng),geoJsonMarkerOptions
                    )).addTo(map); 
                          
                 
            },
            
            
        });
    };


   useEffect(() => {
            console.log("mapClicked updated:", mapClicked);
        clickState(mapClicked);

        }, [mapClicked]);
    return(
<MapContainer center={[51.505, -0.09]} maxBounds={[[-90, -180], [90, 180]]}  boundsOptions={{padding: [200, 200]}}stroke zoom={13} wrapAround = {true}  scrollWheelZoom={true} infinite = {true}maxZoom={11} minZoom={2} className="h-screen" >
  <TileLayer
    attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    subdomains={'abcd'}
    maxZoom = { 20}
  />

    <LocationFinder/>




</MapContainer>

    )
}