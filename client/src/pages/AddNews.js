
import AddNewsForm from '../Components/AddNewsForm'
import Navbar from '../Components/Navbar'
import { useLocation } from 'react-router-dom';
import {React, useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

const AddNews = () => {
  const {state} = useLocation();
  const { coords } = state; 
  const [username, setUsername] = useState("");

  useEffect(() => {
      getUsername();
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
  


  return (
    <div>
        {console.log("hahowa")}
        {console.log(coords)}
      <Navbar username = {username} authenticated = {true}></Navbar>
  <AddNewsForm coords = {coords}></AddNewsForm>
  </div>
  )
}

export default AddNews