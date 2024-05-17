import {React, useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import Map from '../Components/Map'
import News from '../Components/News'

const Drawer = () => {


    const [clicked, setClicked] = useState(true);
    const clickState =(state)=>{
        setClicked(state);
      }

    const [Elcords, setElcords] = useState();
    const cords = (cds) =>{
        setElcords(cds)
    }
    const [showText, setshowText] = useState(false);
    function getOut(){
        setClicked(false)
        setshowText(false)
    }

    function setHeightCheeseDiv() {
        const height = document.getElementById('bar')?.clientHeight;
        if(height!=null){
            document.getElementById('cheese').style.height = `${height}px`;
        }
    }

    useEffect(() => {
        setHeightCheeseDiv();
        setInterval(setHeightCheeseDiv, 1000);
    }, []);



    return (
      <div className="drawer drawer-end h-fit ">

          <input id="my-drawer-4" type="checkbox" className="drawer-toggle peer" checked={clicked} defaultChecked={false}/>
          <div className="drawer-content">
              {/* Page content here */}
              <div className="sticky top-0 bottom-0 z-1">
                  <Navbar></Navbar>
              </div>
              <div className="sticky" onClick={()=>setshowText(true)}>
                  <Map clickState={clickState} cordsMap={cords}></Map>
              </div>
          </div>
          <div  className="drawer-side top-16 z-2 " /*onClick={()=>setClicked(false)}*/>
              <div id="cheese" className="mapdiv" onClick={()=>getOut()}></div>
              <div id="bar">
                  <News  cords={Elcords} clicked={clicked} showText={showText} ></News>
              </div>
          </div>

      </div>


  )
}

export default Drawer