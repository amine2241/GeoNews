import {React,useState} from 'react'
import Log from "../images/login_image.png"

const LogInForm = () => {
    const [formData, setFormData] = useState({
        Email : '',
        Password:'',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        const handleSubmit = (event) => {
            event.preventDefault();
        };

    };
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
                    <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#fe4f02]">
                        Connect your Account
                    </h1>
                    <div className="w-full mt-5 sm:mt-8">
                        <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                            <input
                                type="email"
                                name = "Email"
                                placeholder="Enter Your Email"
                                className="input input-bordered border-[#fe4f02] w-full text-black placeholder:text-black/70"
                                value ={formData.Email}
                                onChange = {handleChange}
                            />
                            <input
                                type="Password"
                                name = "Password"
                                placeholder="Enter Your Password"
                                className="input input-bordered border-[#fe4f02] w-full text-black placeholder:text-black/70"
                                value ={formData.Password}
                                onChange = {handleChange}
                            />
                            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                                <button  type = "submit"
                                    //              onSubmit={handleSubmit}
                                         className="btn btn-active bg-warning btn-block text-white max-w-[200px]">
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

export default LogInForm