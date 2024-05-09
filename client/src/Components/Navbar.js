import React from 'react'
import lp from "../images/loop.png";
import { Link } from "react-router-dom";
export default function Navbar() {
  var curr = new Date();
  curr.setDate(curr.getDate());
  var today = curr.toISOString().substring(0,10);
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
            <li className="space-x-4">
              <img alt="Tailwind CSS Navbar component" src={lp} className="loop" width="20" height="20"/>
              <input type="text" placeholder="Search County/City" className="search"/>
            </li>

          </ul>
        </div>
      </div>
      </form>
      <div className="navbar-end">
        <Link to='/signup' className="btn" style={{color: "#00BFA6"}}>Sign-Up</Link>
        <Link to='/login' className="btn" style={{color: "#fe4f02"}}>Log-In</Link>
      </div>
    </div>
      /*  FOR LOGGED USERS:----------------------------------------------------------------------------------

          <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component"
                   src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>*/
)
}
