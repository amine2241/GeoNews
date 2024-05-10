import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

export default function Map(){

    const geoJsonMarkerOptions ={
        radius:5,
        fillColor: "#0000FF",
        color:"#0000",
        weight: 2,
        opacity:35,
        fillOpacity:0.8
    }

    const LocationFinder = () => {

        const map = useMapEvents({
            click(e) {
                console.log(e.latlng);
                var marker =null
                var mapdata = L.geoJSON(mapdata).addTo(map);
                marker = new L.circleMarker(
                    L.latLng(
                        parseFloat(e.latlng.lat),
                        parseFloat(e.latlng.lng),geoJsonMarkerOptions
                    )).addTo(map);
            },
        });
        return null
    };



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