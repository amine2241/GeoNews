import {React, useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import Map from '../Components/Map'
import News from '../Components/News'

const Drawer = () => {

    //Reset sidebar Configuration-------------------------------------------------------------------------
    const [clicked, setClicked] = useState(true);
    const [showText, setshowText] = useState(false);
    const clickState =(state)=>{
        setClicked(state);
    }
    function getOut(){
        setClicked(false)
        setshowText(false)
    }

    //Coordinates Configuration-------------------------------------------------------------------------
    const [Elcords, setElcords] = useState();
    const cords = (cds) =>{
        setElcords(cds)
    }

    //Height Configuration-------------------------------------------------------------------------
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

    //Dates Configuration-------------------------------------------------------------------------
    var curr = new Date();
    var today = curr.toISOString().substring(0,10);
    const [EldateFrom, setEldateFrom] = useState(today);
    const [EldateTo, setEldateTo] = useState(today);
    const dateF = (dt) =>{
        setEldateFrom(dt)
    }
    const dateT = (dt) =>{
        setEldateTo(dt)
    }

    //Return------------------------------------------------------------------------------------
    return (
      <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle peer" checked={clicked} defaultChecked={false}/>
          <div className="drawer-content">
              <div className="sticky top-0 bottom-0 z-1">
                  <Navbar dateFrom={dateF} dateTo={dateT}></Navbar>
              </div>
              <div className="sticky" onClick={()=>setshowText(true)}>
                  <Map clickState={clickState} cordsMap={cords}></Map>
              </div>
          </div>
          <div  className="drawer-side top-16 z-2 " /*onClick={()=>setClicked(false)}*/>
              <div id="cheese" className="mapdiv" onClick={()=>getOut()}></div>
              <div id="bar">
                  <News  cords={Elcords} dateFrom={EldateFrom} dateTo={EldateTo} showText={showText} ></News>
              </div>
          </div>
      </div>
  )
}

export default Drawer