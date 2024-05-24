import {React, useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import Map from '../Components/Map'
import Drawer from '../Components/Drawer'
import { preventDefault } from 'leaflet/src/dom/DomEvent'
import Cookies from 'js-cookie';
import axios from 'axios';
const Home = () => {
    const [username, setUsername] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        console.log("heldiedneidneid");
        if(checkIfauthenticated()){
            console.log("im called");
            getUsername();
           }

        },[]);

    const getUsername = ()=>{
        const  token= Cookies.get("token");
        axios
        .get("http://localhost:9000/user/details",{
          headers: { token:token }
        } )
        .then(function (response) {
          console.log(response);
          setUsername(response.data);
        });
      }
    const checkIfauthenticated=()=>{
        const token= Cookies.get("token");
        if(token){
            setAuthenticated(true);
            return true;
                }
        else{
            return false;
        }
    }  
 

 
    return (
        <div >
               <Drawer authenticated = {authenticated} username = {username}></Drawer>



        </div>

    )
}

export default Home