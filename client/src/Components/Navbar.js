import {React, useEffect, useState} from 'react'
import lp from "../images/loop.png";
import { Link } from "react-router-dom";
import * as L from "leaflet";
import Cookies from 'js-cookie';
import axios from 'axios';
import vault from "../images/vault_boy.png"
export default function Navbar(props) {

//   useEffect(() => {
// function1();
//   });
//   const function1 = ()=>{
//     const  token= Cookies.get("token");
//     console.log(token);
//     // axios.defaults.withCredentials = true;
//     if(token!= ""){
//     axios
//     .get("http://localhost:9000/user/details",{
//       headers: { token:token }
//     } )
//     .then(function (response) {
//       console.log(response);
//       setUsername(response.data);
//     });}
//   }

  var curr = new Date();
  curr.setDate(curr.getDate());

  var today = curr.toISOString().substring(0,10);

  function Logout(){
    Cookies.remove('token');
    window.location.reload()
  }

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-base-100 " >
      <div className="navbar-start">
        <Link to='/' className="btn btn-ghost text-xl" style={{color: "black", fontWeight: "bold"}}>GeoNews</Link>
      </div>
      <form>
      <div className="navbar-center">
        <div className="navbar-center hidden lg:flex ">
          <ul className=" menu-horizontal px-1 space-x-40">
            <li>
              <input type="date" className="datepicker" value={today} max={today}/>
            </li>
          </ul>
        </div>
      </div>
      </form>
      <div className='navbar-end'>
      {props.authenticated ?  
      <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component"
                   src={vault}/>
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li className='border-b-2 border-black font-bold pl-3'>{props.username}</li>
            <li className="text-red-600"><a onClick={Logout}>Logout</a></li>
          </ul>
        </div>

      
      :      <div className="navbar-end">
   <Link to='/signup' className="btn" style={{color: "#359286"}}>Sign-Up</Link>
   <Link to='/login' className="btn" style={{color: "#7363FF"}}>Log-In</Link>
      </div>}

    </div>
    </div>


)
}
