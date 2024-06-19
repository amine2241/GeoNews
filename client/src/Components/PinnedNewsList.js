import {React, useEffect, useState} from "react";
import Navbar from "./Navbar";
import Map from "./Map";
import News from "./News";
import Cookies from "js-cookie";
import axios from "axios";
import url from "../images/link_logo.png";
import share from "../images/share_logo.png";
import pinNo from "../images/pinned_no.png";
import pinYes from "../images/pinned_yes.png";
import newslogo from "../images/news_logo.png";
import refresh from "../images/refresh_logo.png";

const PinnedNewsList = () => {

    const [formData, setFormData] = useState({
        title: '',
        url : '',
        pic: '',
        date : '',
        token:'',
    });

    const [Listnews,setListnews]= useState([])

    useEffect(() => {
        getPinnedNews();
    },[]);


    const getPinnedNews = ()=>{
        const  token= Cookies.get("token");
        axios
            .get("http://localhost:9000/user/pinnednews",{
                headers: { token:token }
            } )
            .then(function (response) {
                console.log(response);
                setListnews(response.data);
            });
    }

    const unpinNews = (title) => {
        const token = Cookies.get('token')

            console.log("unpin")

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
            window.location.reload()

    };

    //Return------------------------------------------------------------------------------------
    return (
        <div>
            {Listnews.length !== 0 ?
                <div className="pt-2">
                    <table className="menu p-4">
                        <tr className="border-b-2 border-black">
                            <th className="pb-2"></th>
                            <th className="pl-3 text-xl">PINNED NEWS ARTICLES </th>
                            <th className="pl-20"></th>
                        </tr>

                        {Listnews.map(news => {
                        return (

                                    <tr className=" pt-3 pb-3 border-b-2 border-black">
                                        <td className="pr-3 border-r-2 "><img src={news['pic']} alt="article pic" width="270" height="70"/></td>
                                        <td className="pl-3 pr-3 border-r-2 text-base min-w-xl max-w-xl font-semibold">{news['title']}</td>
                                        <td className="pl-3 pr-3 border-r-2 text-base min-w-xl max-w-xl font-semibold text-center">{news['date']}</td>
                                        <td className="pl-3 pr-3 border-r-2 min-w-72 max-w-xl">
                                            <input className="w-full input-sm bg-gray-400" type="text"
                                                   placeholder="link" value={news['url']}/>
                                            <div className="pt-3 pl-20">
                                                <button
                                                    className="bg-indigo-500 text-white rounded text-sm py-2 px-3 ml-2 mr-2 hover:bg-indigo-600"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(news['url'])
                                                    }}>
                                                    Copy
                                                </button>
                                            </div>


                                        </td>
                                        <td className="pl-16 pr-3">
                                            <input type="image" name="submit" src={pinYes} alt="pin btn"
                                                   width="30" height="30"
                                                   className="float-right cursor-pointer"
                                                   onClick={(e) => unpinNews(news['title'])}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                :
                <div className="text-xl text-gray-500 text-center pt-40">
                You have no pinned articles! <br/><br/>
                    How about generating news and saving the ones you want!
                </div>
            }
        </div>
    )
}

export default PinnedNewsList