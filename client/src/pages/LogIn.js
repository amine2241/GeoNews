import React from 'react'
import LogInForm from '../Components/LogInForm'
import Navbar from "../Components/Navbar";
import Cookies from 'js-cookie';


const LogIn = () => {

    return (
        <div>
            <Navbar/>
            <LogInForm/>
        </div>

    )
}

export default LogIn