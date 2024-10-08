import {React,useState} from 'react'
import axios from 'axios';
import Log from "../images/login_image.png"
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
const LogInForm = () => {
    const [formData, setFormData] = useState({
        username : '',
        password:'',
    });
    const [inputError, setInputError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        console.log(formData);
    };
    const handleSubmit = (event) => {
        console.log(formData);
        axios.post('http://localhost:9000/user/login', formData, {
            headers: {
              "Content-Type": "application/json",
            }
          })
          .then(function (response) {
            if(response.status = 200){
                const token = response.data["accessToken"]
                const inFifteenMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);
                Cookies.set('token', token, { expires: inFifteenMinutes, secure: true });
                redirect();
            }
            console.log(response);
          }).catch(function (error) {
            console.log(error);
            const inputError = error.response.data;
            setInputError(inputError)
            console.log(inputError);
          });
          event.preventDefault();
    };

    const redirect =()=>{
        window.location.href ='/'
    }

    return (
        <div className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5">
            <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
                <div className="sm:w-[60%] lg:w-[70%] bg-cover bg-center items-center justify-center hidden md:flex ">
                    {/* <img
          src="./images/undra"
          alt="login"
          className="h-[500px]"
        /> */}
                    <img src={Log} className="h-[550px]"/>
                </div>
                <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
                    <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#7363FF]">
                        Connect your Account
                    </h1>
                    <div className="w-full mt-5 sm:mt-8">
                        <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                            <div>
                            <input
                                type="text"
                                name = "username"
                                placeholder="Enter Your username"
                                className="input input-bordered border-[#7363FF] w-full text-black placeholder:text-black/70"
                                value ={formData.username}
                                onChange = {handleChange}
                            />
                            </div>
                            <div>
                            <input
                                type="password"
                                name = "password"
                                placeholder="Enter Your Password"
                                className="input input-bordered border-[#7363FF] w-full text-black placeholder:text-black/70"
                                value ={formData.password}
                                onChange = {handleChange}
                            />{inputError?
                         <span className="label-text-alt text-red-500">{inputError}</span>:''}
                            </div>
                       
                            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                                <button onClick={handleSubmit} type = "submit"
                                         className="btn purple_bg btn-block text-white max-w-[200px]"
                                   >
                                    Log-In
                                </button>
                     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInForm;