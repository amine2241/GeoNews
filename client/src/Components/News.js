import "leaflet/dist/leaflet.css";
import React, {useEffect, useState} from "react";
import newslogo from "../images/news_logo.png";
import refresh from "../images/refresh_logo.png";
import url from "../images/link_logo.png";
import share from "../images/share_logo.png";
import pinNo from "../images/pinned_no.png";
import pinYes from "../images/pinned_yes.png";
import moment from "moment/moment";
import axios from "axios";
import Cookies from "js-cookie";

 const News = (props)=>{
    const [showModal, setShowModal] = useState(false);

    //Initiate Variables------------------------------------------------------------------------------------
    const [newsJSON,setnewsJSON]= useState([])
    const [showLoad,setshowLoad]= useState(false)
    const [check,setcheck]= useState(true)

    const [formData, setFormData] = useState({
        title: '',
        url : '',
        pic: '',
        date : '',
    });

    //API Fetch Request------------------------------------------------------------------------------------
    function fetchNews(){
        setshowLoad(true)
        setcheck(false)
        console.log("i started fetching" );

        // const url = 'https://api.worldnewsapi.com/search-news?source-countries=us';
        const url = 'https://api.worldnewsapi.com/search-news?location-filter='+props.cords+',75&latest-publish-date='+props.dateTo+'&earliest-publish-date='+props.dateFrom;
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
            .catch(error => console.error('There was a problem with the fetch operation:', error))
    }

    //Show initial text if the sidebar is reset-----------------------------------------------------------------------
    useEffect(
        function onChange() {
            if (props.showText !== props.showText.current) {
                setcheck(true)
            }
        },
        [props.showText]
    )

    const PinNews = (e,title,url,image,date) => {
        console.log("pin")

        if(e.target.src.includes(pinNo)){
            e.target.src=pinYes

            formData.title=title
            formData.url=url
            formData.pic=image
            formData.date=date

            const token = Cookies.get('token')

            axios.post('http://localhost:9000/news/pin', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token
                }
            })
                .then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
            })

        } else{
            e.target.src=pinNo
        }
    };

    //Return------------------------------------------------------------------------------------
    return (
        <div>
            {console.log(newsJSON)}
            <table className="menu p-4 w-80  bg-base-200 min-h-screen ">
                <tr className="border-b-2 border-black">
                    <th className="pb-2"><img src={newslogo} alt="news logo" width="30" height="30"/></th>
                    <th className="pl-3">NEWS ARTICLES </th>
                    <th className="pl-20"><img className="cursor-pointer" src={refresh} alt="refresh btn" width="30" height="30" onClick={fetchNews}/></th>
                </tr>
                {!showLoad && !check && (
                    newsJSON.length !== 0 ?
                        newsJSON.map(news => {
                            return (
                                <div className="pt-2">
                                    <tr>
                                        <td className="font-semibold">{news['title']}</td>
                                    </tr>
                                    <tr>
                                        <td><img src={news['image']} alt="article pic" width="270" height="70"/></td>
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
                                              onClick={() => props.showmod(true,news['url'],news['title'])
                                              }
                                             >
                                                <img src={share} alt="share btn" width="20" height="20"
                                                     className="float-left cursor-pointer"/>
                                            </a>  
                                                {props.authenticated &&(
                                                    <input type="image" name="submit" src={pinNo} alt="pin btn" width="20" height="20"
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
                            No news were found :( <br/><br/>
                            Try again by selecting different coordinates or times!
                        </span>
                )}

                {check && !showLoad && (
                    <span className=" text-xs pt-44 text-gray-500">
                        Click the Refresh button to the top right to generate news articles!<br/> <br/>
                        You can also change the dates to generate articles belonging to that time period!
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