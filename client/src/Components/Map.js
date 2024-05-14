import {MapContainer, TileLayer, useMapEvents} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import icon from "../images/marker_icon.png"

export default function Map(){


    var markicon = L.icon({
        iconUrl: icon,
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [22, 45], // point of the icon which will correspond to marker's location
    });

    var marker =null;
    const LocationFinder = () => {
        const map = useMapEvents({
            click(e) {
                if(marker){
                    map.removeLayer(marker);
                }
                console.log(e.latlng);
                var mapdata = L.geoJSON(mapdata).addTo(map);
                marker = new L.marker(
                    L.latLng(
                        parseFloat(e.latlng.lat),
                        parseFloat(e.latlng.lng)
                    ),{icon: markicon}).addTo(map);
                map.setView(e.latlng);
                 
            },
            
        });
        return null
    };



    return(
<MapContainer center={[51.505,-0.09]} maxBounds={[[-90, -180], [90, 180]]}  boundsOptions={{padding: [200, 200]}} stroke zoom={13} wrapAround = {true} scrollWheelZoom={true}  infinite = {true} maxZoom={11} minZoom={2} className="h-screen">
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