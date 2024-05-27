import {React, useEffect, useState} from 'react'
import Navbar from '../Components/Navbar'
import Map from '../Components/Map'
import News from '../Components/News'
import { SocialIcon } from 'react-social-icons'
const MyModal = ({visible, onClose, newsTitle, newsLink}) => {
    console.log("this is the visibility "+ visible);
    if (!visible) return null;
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
      };
  
  
    return (
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-10"
      >
        <div className="bg-white p-4 rounded">
          <h1 className="font-semibold text-center text-xl text-gray-700">
            Share News
          </h1>
          <hr></hr>
          <ul className='flex items-center justify-center  px-0'>
          <SocialIcon network="twitter"  className=' mx-1.5' href={"https://twitter.com/intent/tweet?text=" + newsTitle + "&url=" + newsLink} target='blank'/>
          <SocialIcon network="facebook" className=' mx-1.5'  href={"https://www.facebook.com/sharer/sharer.php?u="+newsLink+ "&quote=" + newsTitle} target='blank' />
          <SocialIcon network="instagram"   href={"https://www.instagram.com/arany_76"} className=' mx-1.5' target='blank'/>
          <SocialIcon network="linkedin" href={"https://www.linkedin.com/feed/?shareActive=true&text="+ newsTitle + " " + newsLink} className=' mx-1.5' target='blank'/>
      </ul>
        </div>
      </div>
    );
  };

const Drawer = (props) => {

    //Reset sidebar Configuration-------------------------------------------------------------------------
    const [clicked, setClicked] = useState(true);
    const [showText, setshowText] = useState(false);
    const [newsLink, setNewsLink] = useState("");
    const [newsTitle, setNewsTitle] = useState("");
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
    const showmod = (cds,newsLink, newsTitle) =>{
        setElModal(cds)
        setNewsLink(newsLink);
        console.log("this is the link "+ newsLink);
        setNewsTitle(newsTitle);
    

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
              <MyModal onClose={() => setElModal(false)} visible={ElModal} newsLink={newsLink} newsTitle={newsTitle}/>
          </div>
          <div  className="drawer-side top-16 z-2 " /*onClick={()=>setClicked(false)}*/>
              <div id="cheese" className="mapdiv" onClick={()=>getOut()}></div>
              <div id="bar">
                  <News  cords={Elcords} dateFrom={EldateFrom} dateTo={EldateTo} showText={showText} authenticated = {props.authenticated}  showmod={showmod}></News>
              </div>
          </div>
      </div>
  )
}

export default Drawer