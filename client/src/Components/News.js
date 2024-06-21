import "leaflet/dist/leaflet.css";
import React, {useEffect, useState} from "react";
import newslogo from "../images/news_logo.png";
import refresh from "../images/refresh_logo.png";
import url from "../images/link_logo.png";
import share from "../images/share_logo.png";
import pinNo from "../images/pinned_no.png";
import pinYes from "../images/pinned_yes.png";
import axios from "axios";
import Cookies from "js-cookie";
import url_red from "../images/link_logo_red.png";
import share_red from "../images/share_logo_red.png";
import { Navigate, useNavigate } from "react-router-dom";

 const News = (props)=>{
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    

    //Initiate Variables------------------------------------------------------------------------------------
    const [newsJSON,setnewsJSON]= useState([])
    const [showLoad,setshowLoad]= useState(false)
    const [check,setcheck]= useState(true)
    const [listPinnedNews,setlistPinnedNews]= useState([])
     const [ListCreatednews,setListCreatednews]= useState([])

   


     const [formData, setFormData] = useState({
        title: '',
        url : '',
        pic: '',
        date : '',
        token:'',
    });

     const [formCreatedNewsData, setFormCreatedNewsData] = useState({
         lat: '',
         lng : '',
         date_from : '',
         date_to : '',
     });
 

    //API Fetch Request------------------------------------------------------------------------------------
    function fetchNews(){
        setshowLoad(true)
        setcheck(false)
        console.log("i started fetching" );

        //USER CREATED NEWS:----------------------------------------------------------------------------------------------------------

        formCreatedNewsData.lat=props.cords.split(",")[0];
        formCreatedNewsData.lng=props.cords.split(",")[1];
        formCreatedNewsData.date_from=props.dateFrom;
        formCreatedNewsData.date_to=props.dateTo;

        console.log("from: "+formCreatedNewsData.date_from+" to: "+formCreatedNewsData.date_to)

        axios
            .post("http://localhost:9000/news/creatednews",formCreatedNewsData,{
                "Content-Type": "application/json",
            } )
            .then(function (response) {
                console.log(response);
                setListCreatednews(response.data);
            }).catch(function (error) {
            console.log(error);
        });
        setshowLoad(false)

        //---------------------------------------------------------------------------------------------------------

        /*
        const url = 'https://api.worldnewsapi.com/search-news?source-countries=us';
        //const url = 'https://api.worldnewsapi.com/search-news?location-filter='+props.cords+',75&latest-publish-date='+props.dateTo+'&earliest-publish-date='+props.dateFrom;
        const apiKey = 'f4b49d26f0f44957a794614a95f66a04';
        console.log(url);

        fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        }).then(response => {

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("i just finished")
            return response.json();
        })
            .then(data => setnewsJSON(data.news))
            .then(function(data){ setshowLoad(false)})
            .catch(error => console.error('There was a problem with the fetch operation:', error))*/
    }

    //Show initial text if the sidebar is reset-----------------------------------------------------------------------
    useEffect(
        function onChange() {
            if(formCreatedNewsData.lat+","+formCreatedNewsData.lng !==props.cords && props.cords !== undefined){
                formCreatedNewsData.lat=props.cords.split(",")[0];
                formCreatedNewsData.lng=props.cords.split(",")[1];
            }
            if (props.showText !== props.showText.current) {
                setcheck(true)
            }
            if(props.authenticated){
                getPinnedNews()
            }
        },
        [props.showText]
    )


     const getPinnedNews = ()=>{
         const  token= Cookies.get("token");
         axios
             .get("http://localhost:9000/user/pinnednews",{
                 headers: { token:token }
             } )
             .then(function (response) {
                 console.log(response);
                 setlistPinnedNews(response.data);
             });
     }

     const CheckIfPinned = (title)=>{
         var exists=false
         listPinnedNews.map(news => {
             if(title===news['title']){
                 exists=true
             }
         })
         if(exists){
             return pinYes
         }else {
             return pinNo
         }
     }

    const PinNews = (e,title,url,image,date) => {
        const token = Cookies.get('token')

        if(e.target.src.includes(pinNo)){
            console.log("pin")
            e.target.src=pinYes

            formData.title=title
            formData.url=url
            formData.pic=image
            console.log(date);
            console.log(date.substring(0,10));
            formData.date= date.substring(0,10);

            axios.post('http://localhost:9000/news/pin', formData, {
                headers: {
                    'Content-Type': 'application/json',
                     token:token
                }
            })
                .then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
            })

        } else{
            console.log("unpin")
            e.target.src=pinNo

            formData.title=title

            axios.post('http://localhost:9000/user/unpin', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    token:token
                }
            })
                .then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                console.log(error);
            })
        }
    };

    //Return------------------------------------------------------------------------------------
    return (
        <div>
            <table className="menu p-4 w-80  bg-base-200 min-h-screen ">
                <tr className="border-b-2 border-black">
                    <th className="pb-2"><img src={newslogo} alt="news logo" width="30" height="30"/></th>
                    <th className="pl-3">NEWS ARTICLES </th>
                    {!check && (
                    <th className="pl-20"><img className="cursor-pointer" src={refresh} alt="refresh btn" width="30" height="30" onClick={fetchNews}/></th>
                        )}
                </tr>
                {!showLoad && !check && (
                    ListCreatednews.length !== 0 ? ListCreatednews.map(news => {
                    return (
                        <div className="pt-2 bg-red-200 text-red-700">
                            <tr>
                                <td className="font-semibold">{news['title']}</td>
                            </tr>
                            <tr>
                                <td><img src={news['pic']} alt="article pic" width="270" height="70"/></td>
                            </tr>
                            <tr>
                                <td className="font-semibold pt-2">publish date: {news['date']}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold pt-2">created by: {news['createdby']}</td>
                            </tr>
                            <tr className="border-b-2 border-black ">
                                <td className="pt-2 pb-2">
                                    <a href={news['url']} target="_blank" rel="noreferrer">
                                        <img src={url_red} alt="url btn" width="20" height="30"
                                             className="float-left cursor-pointer"/>
                                    </a>
                                    <div className="float-right cursor-pointer ">
                                        <a className="twitter pr-4"
                                           onClick={() => props.showmod(true, news['url'], news['title'])
                                           }
                                        >
                                            <img src={share_red} alt="share btn" width="20" height="20"
                                                 className="float-left cursor-pointer"/>
                                        </a>
                                        {props.authenticated && (
                                            <input type="image" name="submit" src={CheckIfPinned(news['title'])}
                                                   alt="pin btn" width="20" height="20"
                                                   className="float-right cursor-pointer"
                                                   onClick={(e) => PinNews(e, news['title'], news['url'], news['pic'], news['date'])}/>
                                        )}
                                    </div>

                                </td>
                            </tr>
                        </div>
                    )
                    }) : <div></div>
                )}

                {!showLoad && !check && (
                    newsJSON.length !== 0 ?
                            newsJSON.map(news => {
                                return (
                                    <div className="pt-2">
                                        <tr>
                                            <td className="font-semibold">{news['title']}</td>
                                        </tr>
                                        <tr>
                                            <td><img src={news['image']} alt="article pic" width="270" height="70"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold pt-2">publish date: {news['publish_date']}</td>
                                        </tr>
                                        <tr className="border-b-2 border-black ">
                                            <td className="pt-2 pb-2">
                                                <a href={news['url']} target="_blank" rel="noreferrer">
                                                    <img src={url} alt="url btn" width="20" height="30"
                                                         className="float-left cursor-pointer"/>
                                                </a>
                                                <div className="float-right cursor-pointer ">
                                                    <a className="twitter pr-4"
                                                       onClick={() => props.showmod(true, news['url'], news['title'])
                                                       }
                                                    >
                                                        <img src={share} alt="share btn" width="20" height="20"
                                                             className="float-left cursor-pointer"/>
                                                    </a>
                                                    {props.authenticated && (
                                                        <input type="image" name="submit"
                                                               src={CheckIfPinned(news['title'])} alt="pin btn"
                                                               width="20" height="20"
                                                               className="float-right cursor-pointer"
                                                               onClick={(e) => PinNews(e, news['title'], news['url'], news['image'], news['publish_date'])}/>
                                                    )}
                                            </div>

                                        </td>
                                    </tr>
                                </div>
                            )
                        })
                        :
                        <span className=" text-xs pt-44 text-gray-500 text-center">
                            No news were generated :( <br/><br/>
                            Try again by selecting different coordinates or times!
                        </span>
                )}

                {check && !showLoad && (
                    <span className=" text-xs pt-32 text-gray-500 text-center">
                        Click the "Generate" button below to generate news articles pertaining to the time period selected!<br/> <br/>
                        <button className="btn bg-black text-white btn-block max-w-[100px]"
                                onClick={fetchNews}>Generate</button>

                        {props.authenticated && (<div><br/>
                                You can also add your own news related to this location!<br/> <br/>
                                <button className="btn bg-black text-white btn-block max-w-[110px]" onClick={()=> navigate('/AddNews', { state: {coords :formCreatedNewsData } })}>Add news</button>
                            </div>
                        )}
                        <br/> <br/>

                        The <span className="text-red-400">Red News </span> are articles created by users.

                    </span>
                    )}

                {showLoad && (
                    <span className="loading load loading-spinner loading-lg"></span>
                )}

            </table>
        </div>
    )
 }
export default News;