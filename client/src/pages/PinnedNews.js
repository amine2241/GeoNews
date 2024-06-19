import {React, useEffect, useState} from 'react'
import Drawer from '../Components/Drawer'
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from "../Components/Navbar";
import PinnedNewsList from "../Components/PinnedNewsList";

const PinnedNews = () => {
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
        <div >
            <Navbar username = {username} authenticated = {true}></Navbar>
            <PinnedNewsList></PinnedNewsList>
        </div>

    )
}

export default PinnedNews