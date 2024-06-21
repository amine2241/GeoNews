
import {React,useState} from 'react'
import axios from 'axios';
import Sign from "../images/signup_image.png"
import Cookies from "js-cookie";

const AddNewsForm = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        pic: '',
        date: '',
        lat:31.521,
        lng:-7.97868,
      });
    
      const handleChange = (e) => {
        if(e.target.files){    
          const { name} = e.target; 
          const data = new FileReader()
          data.addEventListener('load',()=>{
            console.log(data.result);
            setFormData(prevState => ({
              ...prevState,
              [name]: data.result,
            }));
          })
          data.readAsDataURL(e.target.files[0])}
        else {  
          const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));}
        console.log(formData);
      };
      // const convertToBase64 = () => {
      //   const reader = new FileReader()
    
      //   reader.readAsDataURL(image)
    
      //   reader.onload = () => {
      //     console.log('called: ', reader)
      //     setImage(reader.result)
      //   }
      // }
    
      // function emptyUNerrors(){
      //   setUsernameError('')
      //   setUnique('')
      // }
    
      const handleSubmit = (event) => {
        // convertToBase64();
        console.log(formData);
        
      //   console.log("submitting");
      //   setUnique('')
      //   const passVal = document.getElementById('Password');
      //   const confVal = document.getElementById('ConfPassword');
    
      //   if(passVal.value!==confVal.value){
      //     setpasswordMatch('Passwords do not match!')
      //   }else{
        const  token= Cookies.get("token");
    
          axios.post('http://localhost:9000/news/add', formData, {
            headers: { token:token }
          })
              .then(function (response) {
                console.log(response);
                // redirect(); 
                })

              // }).catch(function (error) {
      //       console.log(error);
      //       const input_errors = error.response.data.fieldErrors;
      //       console.log(input_errors);
      //       if(typeof error.response.data==="string"){
      //         setUnique(error.response.data)
      //       }
      //       if(input_errors) {
      //         input_errors.forEach(fieldError => {
      //           if(fieldError.field === 'firstName'){
      //             setFirstNameError(fieldError.message);
      //           }
      //           if(fieldError.field === 'lastName'){
      //             setLastNameError(fieldError.message);
      //           }
      //           if(fieldError.field === 'username'){
      //             setUsernameError(fieldError.message);
      //           }
      //           if(fieldError.field === 'email'){
      //             setEmailError(fieldError.message);
      //           }
    
      //           if(fieldError.field === 'password'){
      //             setPasswordError(fieldError.message);
      //           }
      //         });
      //       }
      //     });
      //     event.preventDefault();
      //   }
      };
    
      const redirect =()=>{
        window.location.href ='/login'
      }
    
      let color = 'bg-red-500'
  return (
    <div className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5">
    <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-auto rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
      <div className="mx-auto w-full lg:w-full md:p-10 py-5 md:py-0">
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-black">
          Add News
        </h1>
        <div className="w-full mt-5 sm:mt-8">
          <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <div>
              <input
                  type="text"
                  name="title"
                  placeholder="Enter News Title "
                  className="input input-bordered border-black w-full text-black placeholder:text-black/70"
                  value={formData.title}
                  onChange={handleChange}
                  // onInput={() => emptyUNerrors()}
              />
              {/* {UsernameError || Unique ?
                  <span className="label-text-alt text-red-500">{UsernameError}{Unique}</span>
                  : <div> &nbsp;</div>} */}
            </div>
            <div>
              <input
                  type="email"
                  name="url"
                  placeholder="Enter News Link"
                  className="input input-bordered border-black w-full text-black placeholder:text-black/70"
                  value={formData.url}
                  onChange={handleChange}
                  // onInput={() => setEmailError('')}
              />
              {/* {emailError ?
                  <span className="label-text-alt text-red-500">{emailError}</span>
                  : <div> &nbsp;</div>} */}
            </div>
            <div>
  <input className="file-input file-input-bordered w-full max-w-xs " type='file'accept='image/*'
  name = "pic"
  onChange={handleChange} 
   />
  {/* {emailError ?
                  <span className="label-text-alt text-red-500">{emailError}</span>
                  : <div> &nbsp;</div>} */}
  </div>
  <div>
              <input
                  type="date"
                  name="date"
                  placeholder="Enter Link"
                  className="input input-bordered border-black w-full text-black placeholder:text-black/70"
                  value={formData.date}
                  onChange={handleChange}
                  // onInput={() => setEm)}
              />
              {/* {emailError ?
                  <span className="label-text-alt text-red-500">{emailError}</span>
                  : <div> &nbsp;</div>} */}
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

export default AddNewsForm