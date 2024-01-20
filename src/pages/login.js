// login doctor/ patient
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { changeUserType } from "../../slices/userType";
import Jwt from "jsonwebtoken";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function login() {
  const dispatch = useDispatch();

  const router = useRouter();

  const [myWebsiteName, setMyWebsiteName] = useState();
  // updating website name
  useEffect(() => {
    axios
      .get("/api/getSiteSetting")
      .then((response) => {
        const name = response.data.data.websiteName;
        setMyWebsiteName(name);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmail = (email) => {
      // Regular expression to check if string is email
      const regexExp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      return regexExp.test(email); // true
    };

    if (!isEmail(email)) {
      // email
      toast.error("Please enter a valid email.", emitterConfig);
    } else if (password.length === 0) {
      toast.error("Please enter password.", emitterConfig);
    } else if (password.length < 6) {
      toast.error(
        "Length of password should be atleast 6 characters.",
        emitterConfig
      );
    } else {
      // if not above cases, form is validated
      axios
        .post("/api/login", {
          Email: email,
          Password: password,
        })
        .then((response) => {
          if (response.data.success === true) {
            toast.success("Logged in Successfully !");
            // set token
            localStorage.setItem("token", response.data.token);

            // now set the userType in redux store
            // first decrypt the token
            let decryptedToken = Jwt.decode(
              response.data.token,
              process.env.JWT_SECRET
            );
            dispatch(changeUserType(decryptedToken.UserType));

            // UPDATING LAST VISIT --
            const updateData = {
              Email: decryptedToken.Email,
              LastVisit: new Date(Date.now()),
            };
            if (decryptedToken.UserType === "Patient") {
              axios.put(`/api/updatePatients`, updateData).catch((error) => {
                console.log(error.message);
              });
            }else if(decryptedToken.UserType === "Doctor"){
              axios.put(`/api/updateDoctors`, updateData).catch((error) => {
                console.log(error.message);
              });
            }

            setTimeout(() => {
              router.push("/");
            }, 1000);
          } else if (response.data.success === false) {
            console.log(response.data.error);
            toast.error(response.data.error, emitterConfig);
          }
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };

  return (
    <>
      {/* <!-- Page Content --> */}
      <div className="content">
        <div className="container-fluid">
          <div className="row  pb-10">
            <div className="col-md-8 offset-md-2 ">
              {/* <!-- Login Tab Content --> */}
              <div className="account-content">
                <div className="flex flex-col md:flex-row justify-center items-center">
                  {/* // side image  */}

                  <div className="col-md-7 col-lg-6 login-left mx-3">
                    <img
                      src="assets/img/login-banner.png"
                      className="img-fluid"
                      alt="Doccure Login"
                    />
                  </div>

                  {/* // details entered here  */}

                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>Login {myWebsiteName && myWebsiteName}</h3>
                    </div>
                    <form method="POST">
                      <div className="form-group form-focus">
                        <input
                          type="email"
                          className="form-control floating"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
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
                        <Link className="forgot-link" href="/forgot">
                          Forgot Password ?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary btn-block btn-lg login-btn w-full"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Login
                      </button>
                      
                      <div className="text-center dont-have">
                        Don't have an account ?{" "}
                        <Link href={"/register"}>Register</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- /Login Tab Content --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Page Content --> */}
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

export default login;
