import {MapContainer, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useRef, useState, useEffect } from 'react';
import icon from "../images/marker_icon.png"
import {GeoSearchControl, MapBoxProvider, OpenStreetMapProvider} from 'leaflet-geosearch';



export default function Map({clickState,cordsMap}){
    const [showNews, setshowNews ] = useState(false);


    const SearchField = () => {

        // @ts-ignore
        const searchControl = new GeoSearchControl({
            provider: new OpenStreetMapProvider(),
            style: 'bar ',
            showMarker: true,
            showPopup: false,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: false,
            searchLabel: 'search'
        });

        const map = useMap();
        useEffect(() => {
            map.addControl(searchControl);
            return () => map.removeControl(searchControl);

        }, []);



    };

    

    var markicon = L.icon({
        iconUrl: icon,
        iconSize:     [38, 38], // size of the icon
        iconAnchor:   [22, 45], // point of the icon which will correspond to marker's location
    });
    const marker = useRef(null);

    const LocationFinder = () => {
        const map = useMapEvents({

            click(e) {
                if(marker.current){
                    map.removeLayer(marker.current);

                }

                console.log(e.latlng);
                setshowNews(false);
                var mapdata = L.geoJSON(mapdata).addTo(map);
                marker.current = new L.marker(
                    L.latLng(
                        parseFloat(e.latlng.lat),
                        parseFloat(e.latlng.lng)
                    ),{icon: markicon}).addTo(map).on('click', function(e) {
                    setshowNews(true);
                });
                map.setView(e.latlng);
                cordsMap(e.latlng.lat+","+e.latlng.lng)
            },
        });
    };


    useEffect(() => {
        clickState(showNews);
    }, [showNews]);

    return(
        <MapContainer center={[51.505,-0.09]} maxBounds={[[-90, -180], [90, 180]]}  boundsOptions={{padding: [200, 200]}} stroke zoom={13} wrapAround = {true} scrollWheelZoom={true}  infinite = {true} maxZoom={11} minZoom={2} className="h-screen">
            <TileLayer
                attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                subdomains={'abcd'}
                maxZoom = { 20}
            />

            <LocationFinder/>
            {<SearchField/>}

        </MapContainer>

    )
}
