import React from "react";
import lp from "../images/loop.png"
export default function Navbar(){
    var curr = new Date();
    curr.setDate(curr.getDate());
    var today = curr.toISOString().substring(0,10);
    return (<form>
        <nav class="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "white"}}>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <a class="navbar-brand mx-auto position-absolute m-lg-4"
                   style={{color: "black", fontWeight: "bold"}}>GeoNews</a>

                <div class="navbar-nav mx-auto text-md-center text-left">

                    <img src={lp} className="loop" width="20" height="20"/>
                    <input type="input" className="search" placeholder="Search County/City"/>

                    <a className="nav-item nav-link"></a><a className="nav-item nav-link"></a><a
                    className="nav-item nav-link"></a><a className="nav-item nav-link"></a><a
                    className="nav-item nav-link"></a><a className="nav-item nav-link"></a><a
                    className="nav-item nav-link"></a><a className="nav-item nav-link"></a><a
                    className="nav-item nav-link"></a><a className="nav-item nav-link"></a><a
                    className="nav-item nav-link"></a><a className="nav-item nav-link"></a><a
                    className="nav-item nav-link"></a><a className="nav-item nav-link"></a><a
                    className="nav-item nav-link"></a><a className="nav-item nav-link"></a><a
                    className="nav-item nav-link"></a>

                    <a className="nav-item nav-link"></a>
                    <input type="date" className="datepicker" value={today} max={today} />

                </div>

                <div class="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap ">
                    <a class="nav-item nav-link " style={{color: "black", fontWeight: "bold"}}>Log-in</a>
                </div>

</div>
</nav></form>
    )
}