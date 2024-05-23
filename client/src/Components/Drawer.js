import {React, useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import Map from '../Components/Map'
import News from '../Components/News'
const MyModal = ({visible, onClose}) => {
    console.log("this is the visibility "+ visible);
    if (!visible) return null;
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
      };
  
  
    return (
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white p-4 rounded">
          <h1 className="font-semibold text-center text-xl text-gray-700">
            Welcome back
          </h1>
          <p className="text-center text-gray-700 mb-5">Sign in</p>
  
          <div className="flex flex-col">
            <input
              type="text"
              className="border border-gray-700 p-2 rounded mb-5"
              placeholder="email@example.com"
            />
            <input
              type="text"
              className="border border-gray-700 p-2 rounded mb-5"
              placeholder="********"
            />
          </div>
          <div className="text-center">
            <button className="px-5 py-2 bg-gray-700 text-white rounded">
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  };

const Drawer = (props) => {

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

    const [ElModal, setElModal] = useState(false);
    const showmod = (cds) =>{
        setElModal(cds)
        console.log("pop up"+ ElModal);
    }

    //Return------------------------------------------------------------------------------------
    return (
        
      <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle peer" checked={clicked} defaultChecked={false}/>
          <div className="drawer-content">
              <div className="sticky top-0 bottom-0 z-1">
                  <Navbar dateFrom={dateF} dateTo={dateT} username = {props.username} authenticated = {props.authenticated}></Navbar>
              </div>
              <div className="sticky" onClick={()=>setshowText(true)}>
                  <Map clickState={clickState} cordsMap={cords}></Map>
              </div>
              <MyModal onClose={() => setElModal(false)} visible={ElModal}/>
          </div>
          <div  className="drawer-side top-16 z-2 " /*onClick={()=>setClicked(false)}*/>
              <div id="cheese" className="mapdiv" onClick={()=>getOut()}></div>
              <div id="bar">
                  <News  cords={Elcords} dateFrom={EldateFrom} dateTo={EldateTo} showText={showText} showmod={showmod} />
              </div>
          </div>
      </div>
  )
}

export default Drawer