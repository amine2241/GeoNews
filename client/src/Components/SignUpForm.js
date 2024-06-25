import {React,useState} from 'react'
import axios from 'axios';
import Sign from "../images/signup_image.png"

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName : '',
    username: '',
    email : '',
    password:'',
  });
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [UsernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [Unique, setUnique] = useState('');
  const [passwordMatch, setpasswordMatch] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  function emptyUNerrors(){
    setUsernameError('')
    setUnique('')
  }

  const handleSubmit = (event) => {
    console.log("submitting");
    setUnique('')
    const passVal = document.getElementById('Password');
    const confVal = document.getElementById('ConfPassword');

    if(passVal.value!==confVal.value){
      setpasswordMatch('Passwords do not match!')
    }else{

      axios.post('http://localhost:9000/user/registration', formData, {
        headers: {
          "Content-Type": "application/json",
        }
      })
          .then(function (response) {
            console.log(response);
            redirect();
          }).catch(function (error) {
        console.log(error);
        const input_errors = error.response.data.fieldErrors;
        console.log(input_errors);
        if(typeof error.response.data==="string"){
          setUnique(error.response.data)
        }
        if(input_errors) {
          input_errors.forEach(fieldError => {
            if(fieldError.field === 'firstName'){
              setFirstNameError(fieldError.message);
            }
            if(fieldError.field === 'lastName'){
              setLastNameError(fieldError.message);
            }
            if(fieldError.field === 'username'){
              setUsernameError(fieldError.message);
            }
            if(fieldError.field === 'email'){
              setEmailError(fieldError.message);
            }

            if(fieldError.field === 'password'){
              setPasswordError(fieldError.message);
            }
          });
        }
      });
      event.preventDefault();
    }
  };

  const redirect =()=>{
    window.location.href ='/login'
  }

  let color = 'bg-red-500'
  return (
      <div className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5">
        <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
          <div className="sm:w-[60%] lg:w-[60%] bg-cover bg-center items-center justify-center hidden md:flex ">
            {/* <img
          src="./images/undra"
          alt="login"
          className="h-[500px]"
        /> */}
            <img src={Sign} className="h-[550px]"/>
          </div>
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#359286]">
              Create an Account
            </h1>
            <div className="w-full mt-5 sm:mt-8">
              <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-3 ">
                  <div>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter Your First Name"
                        className="input input-bordered border-[#359286] w-full max-w-xs text-black placeholder:text-black/70"
                        value={formData.firstName}
                        onChange={handleChange}
                        onInput={() => setFirstNameError('')}
                    />
                    {firstNameError ?
                        <div className="label">
                          <span className="label-text-alt text-red-500">{firstNameError}</span>
                        </div>
                        : <div> &nbsp;</div>}
                  </div>
                  <div>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter Your Last Name"
                        className="input input-bordered border-[#359286] w-full max-w-xs text-black placeholder:text-black/70"
                        value={formData.lastName}
                        onChange={handleChange}
                        onInput={() => setLastNameError('')}
                    />
                    {lastNameError ?
                        <div className="label">
                          <span className="label-text-alt text-red-500">{lastNameError}</span>
                        </div>
                        : <div> &nbsp;</div>}
                  </div>
                </div>
                <div>
                  <input
                      type="text"
                      name="username"
                      placeholder="Enter Your Username"
                      className="input input-bordered border-[#359286] w-full text-black placeholder:text-black/70"
                      value={formData.username}
                      onChange={handleChange}
                      onInput={() => emptyUNerrors()}
                  />
                  {UsernameError || Unique ?
                      <span className="label-text-alt text-red-500">{UsernameError}{Unique}</span>
                      : <div> &nbsp;</div>}
                </div>
                <div>
                  <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      className="input input-bordered border-[#359286] w-full text-black placeholder:text-black/70"
                      value={formData.email}
                      onChange={handleChange}
                      onInput={() => setEmailError('')}
                  />
                  {emailError ?
                      <span className="label-text-alt text-red-500">{emailError}</span>
                      : <div> &nbsp;</div>}
                </div>
                <div>
                <input
                    type="Password"
                    name="password"
                    id="Password"
                    placeholder="Enter Your Password"
                    className="input input-bordered border-[#359286] w-full text-black placeholder:text-black/70"
                    value={formData.password}
                    onChange={handleChange}
                    onInput={() => setPasswordError('')}
                />
                {passwordError ?
                    <span className="label-text-alt text-red-500 ">{passwordError}</span>
                    : <div> &nbsp;</div>}
                </div>
                <div>
                <input
                    type="Password"
                    name="ConfPassword"
                    id="ConfPassword"
                    placeholder="Confirm Your Password"
                    className="input input-bordered border-[#359286] w-full text-black placeholder:text-black/70"
                    onInput={() => setpasswordMatch('')}
                />
                  {passwordMatch ?
                      <span className="label-text-alt text-red-500">{passwordMatch}</span>
                      :  <div> &nbsp;</div>}
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                  <button type="submit"
                          onClick={handleSubmit}
                          className="btn green_bg text-white btn-block max-w-[200px] ">
                    Sign Up
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