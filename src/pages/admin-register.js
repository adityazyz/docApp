import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function adminRegister() {
 
  const router = useRouter();

  const emitterConfig = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    router.push("/");
  
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmail = ( email) => {
      // Regular expression to check if string is email
      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      return regexExp.test(email); // true
    };


    // validation
    if (name.length === 0) {// name
      toast.error("Please enter Name.", emitterConfig);
    } else if (name.length < 3) {
      toast.error("Name should have atleat 3 characters.", emitterConfig);
    }else if(email.length === 0){
      toast.error("Please enter email id.", emitterConfig)
    }else if(!isEmail(email)){ // email
      toast.error("Please enter a valid email.", emitterConfig)
    }else if(mobile.length === 0){
      toast.error("Please enter mobile number.", emitterConfig)
    }else if(mobile.length < 10){
      toast.error("Length of mobile number is short.", emitterConfig)
    }else if(password.length === 0){
      toast.error("Please enter password.", emitterConfig)
    }else if(password.length < 6){
      toast.error("Length of password should be atleast 6 characters.", emitterConfig)
    }else {
       // if not above cases, form is validated
       axios.post("/api/registerAdmin", {
        Name : name,
        Email : email,
        Mobile : mobile,
        Password : password
      })
      .then((response)=>{
        toast.success("Registered Successfully !", emitterConfig)
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
                    <div className="login-header">
                      <h3 className="font-semibold">Admin Register </h3>
                    </div>

                    {/* <!-- Register Form --> */}
                    <form method="POST">
                      <div className="form-group form-focus">
                        <input
                          type="text"
                          className="form-control floating"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          placeholder="Name"
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
                        <Link className="forgot-link" href={"/adminLogin"}>
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
          position="top-right"
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

export default adminRegister;
