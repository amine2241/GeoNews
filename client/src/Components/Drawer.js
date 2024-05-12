import {React, useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import Map from '../Components/Map'
import { preventDefault } from 'leaflet/src/dom/DomEvent'

const Drawer = () => {
  const [clicked, setClicked] = useState(false);
    const clickState =(state)=>{
        setClicked(state);
    
      }
  return (
<div className="drawer drawer-end h-fit ">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked ={clicked
  } defaultChecked = {false} />
  <div className="drawer-content">
    {/* Page content here */}
    <div className="sticky top-0 bottom-0 z-10">
                <Navbar></Navbar>
            </div>
            <div className="sticky top-0 z-0">
                <Map clickState={clickState}></Map>
                
            </div>
           
  </div> 
  <div className="drawer-side ">
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>


  )
}

export default Drawer