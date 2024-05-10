import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import React, {useRef} from "react";
import {setPosition} from "leaflet/src/dom/DomUtil";

export default function Navbar(){
    const handleClick = ()=>{
//  const url = 'https://api.worldnewsapi.com/search-news?location-filter=34.051797, -6.807344, 1&latest-publish-date=2024-05-08&earliest-publish-date=2024-05-05';
        const url = 'https://api.worldnewsapi.com/search-news?source-countries=ma&latest-publish-date=2024-05-08&earliest-publish-date=2024-05-05';
        const apiKey = 'f4b49d26f0f44957a794614a95f66a04';

        fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }
    return(<div>
        <button onClick={handleClick}> Hello there </button></div>
    )
}