// register doctor / patient
import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function register() {
    const emitterConfig = {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };

  const [registerFor, setRegisterFor] = useState("Patient");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmail = ( email) => {
      // Regular expression to check if string is email
      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      return regexExp.test(email); // true
    };


    // validation
    if (firstName.length === 0) {// name
      toast.error("Please first enter Name.", emitterConfig);
    } else if (firstName.length < 3) {
      toast.error("First name should have atleat 3 characters.", emitterConfig);
    }else if (lastName.length === 0) {// name
        toast.error("Please enter last Name.", emitterConfig);
    } else if (lastName.length < 3) {
        toast.error("Last name should have atleat 3 characters.", emitterConfig);
    }else if(email.length === 0){
      toast.error("Please enter email id.", emitterConfig)
    }else if(!isEmail(email)){ // email
      toast.error("Please enter a valid email.", emitterConfig)
    }else if(mobile.length === 0){
      toast.error("Please enter mobile number.", emitterConfig)
    }else if(mobile.length != 10){
      toast.error("Length of mobile number is invalid.", emitterConfig)
    }else if(password.length === 0){
      toast.error("Please enter password.", emitterConfig)
    }else if(password.length < 6){
      toast.error("Length of password should be atleast 6 characters.", emitterConfig)
    }else {
       // if not above cases, form is validated
       let info = {
        UserType : registerFor,
        FirstName : firstName,
        LastName : lastName,
        Email : email,
        Mobile : {
          Number : mobile,
          iso2 : "",
          dialCode : ""
        },
        Password : password
      }
      if(registerFor === "Patient"){
        
        // for patient id 
        // let firstHalf = email.split("@")
        // firstHalf = firstHalf[0].slice(-5); // taking last 5 letters
        // let secondHalf = mobile.slice(-4)
        // info["PatientId"] = `${firstHalf}${secondHalf}`
      }
      axios.post("/api/register", info )
      .then((response)=>{
        if(response.data.success === false){
            toast.error(response.data.message, emitterConfig);
        }else{
            toast.success("Registered Successfully !", emitterConfig)
        }
      })
      .catch((error)=>{console.log({error})})
    }
  };

  return (
    <>
      {/* <!-- Page Content --> */}
      <div className="content mt-2 mb-10">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {/* <!-- Register Content --> */}
              <div className="account-content">
                <div className=" flex flex-col md:flex-row justify-center items-center">
                  <div className="col-md-7 col-lg-6 login-left mr-5">
                    <img
                      src="assets/img/login-banner.png"
                       className="img-fluid"
                      alt="Doccure Register"
                    />
                  </div>

                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header flex justify-between">
                      <h3 className="font-semibold">{registerFor} Register </h3>
                      <h2 className=" text-sm hover:text-[#4AB13A] cursor-pointer mr-2"
                      onClick={()=>{
                        
                        (registerFor === "Patient")? setRegisterFor("Doctor") : setRegisterFor("Patient");
                        toast(`Register type switched.`, emitterConfig);
                       
                      }}
                      > 
                         {(registerFor ===   "Patient") && "Are you a doctor ?"}
                         {(registerFor === "Doctor") && "Not a doctor ?"}
                    </h2>
                    </div>

                    {/* <!-- Register Form --> */}
                    <form method="POST">
                      <div className="form-group form-focus flex">
                        <input
                          type="text"
                          className="form-control floating mr-3"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          placeholder="First Name"
                        />
                        <input
                          type="text"
                          className="form-control floating"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group form-focus">
                        <input
                          type="text"
                          className="form-control floating"
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value);
                          }}
                          placeholder="Mobile Number"
                        />
                      </div>
                      <div className="form-group form-focus">
                      <div className="form-control flex items-center">
                        <input
                          type={`${showPassword === true ? "Text": "Password"}`}
                          className=" floating w-[92%] outline-none  border-none m-0 p-0"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        {showPassword === true ? 
                        <FaEye className="h-5 w-5" onClick={()=>{
                          setShowPassword(!showPassword);
                        }}/> : 
                        <FaEyeSlash className="h-5 w-5" onClick={()=>{
                          setShowPassword(!showPassword);
                        }}/>}

                        </div>
                      </div>
                      <div className="text-right">
                        <Link className="forgot-link" href={"/login"}>
                          Already have an account?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary btn-block btn-lg login-btn w-[100%] mt-2"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Signup
                      </button>

                      {/* // facebook and google login ============================ */}

                      {/* <div className="login-or">
												<span className="or-line"></span>
												<span className="span-or">or</span>
											</div> */}

                      {/* <div className="row form-row social-login">
												<div className="col-6">
													<a href="#" className="btn btn-facebook btn-block"><i className="fab fa-facebook-f mr-1"></i> Login</a>
												</div>
												<div className="col-6">
													<a href="#" className="btn btn-google btn-block"><i className="fab fa-google mr-1"></i> Login</a>
												</div>
											</div> */}
                    </form>
                    {/* <!-- /Register Form --> */}
                  </div>
                </div>
              </div>
              {/* <!-- /Register Content --> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default register;
