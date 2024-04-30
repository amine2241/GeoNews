import {React,useState} from 'react'
import Sign from "../images/signup_image.png"

const SignUpForm = () => {
const [formData, setFormData] = useState({
  FirstName: '',
  LastName : '',
  Email : '',
  Password:'', 
  ConfPassword: ''
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
      <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
        {/* <img
          src="./images/undra"
          alt="login"
          className="h-[500px]"
        /> */}
        <img src={Sign} className="h-[550px]"/>
      </div>
      <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#00BFA6]">
          Create Account
        </h1>
        <div className="w-full mt-5 sm:mt-8">
          <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name = "FirstName"
                placeholder="Enter Your First Name"
                className="input input-bordered border-[#00BFA6] w-full max-w-xs text-black placeholder:text-black/70"
                value ={formData.FirstName}
                onChange = {handleChange} 
              />
              <input
                type="text"
                name = "LastName"
                placeholder="Enter Your Last Name"
                className="input input-bordered border-[#00BFA6] w-full max-w-xs text-black placeholder:text-black/70"
                value ={formData.LastName}
                onChange = {handleChange} 
                
              />
            </div>
            <input
              type="email"
              name = "Email"
              placeholder="Enter Your Email"
              className="input input-bordered border-[#00BFA6] w-full text-black placeholder:text-black/70"
              value ={formData.Email}
              onChange = {handleChange} 
            />
            <input
              type="text"
              name = "Password"
              placeholder="Enter Your Password"
              className="input input-bordered border-[#00BFA6] w-full text-black placeholder:text-black/70"
              value ={formData.Password}
              onChange = {handleChange} 
            />
            <input
              type="Password"
              name = "ConfPassword"
              placeholder="Confirm Your Password"
              className="input input-bordered border-[#00BFA6] w-full text-black placeholder:text-black/70"
              value ={formData.ConfPassword}
              onChange = {handleChange} 
            />
            <div className="flex items-center gap-1.5  justify-start pl-2">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox-xs checkbox-primary"
                  />
                </label>
              </div>
              <h3 className="flex items-center whitespace-nowrap text-xs text-black">
                I agree to the
                <span className="text-[#00BFA6]">&nbsp;Terms</span>
                &nbsp;and
                <span className="text-[#00BFA6]">&nbsp;Privacy Policy</span>.
              </h3>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
              <button  type = "submit"
              onSubmit={handleSubmit} 
              className="btn btn-active btn-primary btn-block max-w-[200px]">
                Sign Up
              </button>
              <button className="btn btn-outline btn-primary btn-block max-w-[200px]">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUpForm