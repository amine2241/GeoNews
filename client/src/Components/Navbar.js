import React, {useEffect, useState} from 'react'
import arrow from "../images/arrow_logo.png";
import { Link } from "react-router-dom";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default function Navbar({dateFrom,dateTo}) {

    //Dates Configuration-------------------------------------------------------------------------
    var curr = new Date();
    var today = curr.toISOString().substring(0,10);

    const [valueFrom, setvalueFrom] = useState(moment().format('YYYY-MM-DD'));
    const [valueTo, setvalueTo] = useState(moment().format('YYYY-MM-DD'));

    const onChangeDateFrom = e => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setvalueFrom(newDate);
        dateFrom(newDate);
    };
    const onChangeDateTo = e => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setvalueTo(newDate);
        dateTo(newDate);
    };

    //Navbar change------------------------------------------------------------------------------------
    const [showOptions, setshowOptions ] = useState(false);

    useEffect(() => {
        if(window.location.href==="http://localhost:3000/"){
            setshowOptions(true)
        }
    },[showOptions]);

    //Return------------------------------------------------------------------------------------
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-base-100">
            <div className="navbar-start">
                <Link to='/' className="btn btn-ghost text-xl" style={{color: "black", fontWeight: "bold"}}>GeoNews</Link>
            </div>
            {showOptions && (
                <form>
                    <div className="navbar-center">
                        <div className="navbar-center hidden lg:flex ">
                            <ul className=" menu-horizontal px-1 space-x-40">
                                <li className="pr-40">
                                <span className="float-left pr-5">
                                    From:<input id="From" type="date" className="datepicker pl-2" value={valueFrom}
                                                max={valueTo}
                                                min="2022-03-15" onChange={(e) => onChangeDateFrom(e)}/>
                                </span>
                                    <span className="float-left pt-1">
                                    <img src={arrow} alt="arrow" width="20" height="20"/>
                                </span>
                                    <span className=" pl-5">
                                    To:<input id="To" type="date" className="datepicker pl-2" value={valueTo}
                                              max={today}
                                              min={valueFrom} onChange={(e) => onChangeDateTo(e)}/>
                                </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
            )}

            <div className="navbar-end">
                <Link to='/signup' className="btn" style={{color: "#359286"}}>Sign-Up</Link>
                <Link to='/login' className="btn" style={{color: "#7363FF"}}>Log-In</Link>
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