import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

export default function Navbar(){
    function MapEvents() {
        const map = useMapEvents({
           click() {
             console.log("hello")
             map.locate();
           },
           locationfound(e){
            console.log(e.latlng);
           }
        });
       
        return null; // This component doesn't render anything itself
       }
    
    return(
<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} maxZoom={11} >
  <TileLayer
    attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    subdomains={'abcd'}
    maxZoom = { 20}
  />
  <MapEvents/>

</MapContainer>

    )
}