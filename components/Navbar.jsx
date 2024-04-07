import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { changeUserType } from "../slices/userType"; 
import Jwt from "jsonwebtoken";

import { changeDocPFP } from "../slices/docPFPSlice";
import { changePtPFP } from "../slices/ptPFPSlice";
import axios from "axios";

import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { openHomeSidebar, closeHomeSidebar } from "../slices/sidebarSlice";


function Navbar() {
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

  const dispatch = useDispatch();
  const router = useRouter();

  // pfp from redux store
  const docPFP = useSelector((state) => state.docPFP.ProfilePicture);
  const ptPFP = useSelector((state) => state.ptPFP.ProfilePicture);
  const homeSidebarOpen = useSelector((state)=> state.sidebar.homeSidebarOpen);

  const currentUserType = useSelector((state) => state.userType.value);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  // in case the website reloads, set the redux store variable equal to the usertype stored in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // decode it and use values
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);


      if(decryptedToken){
        dispatch(changeUserType(decryptedToken.UserType)); // setting userType
        // get docspfp or pt pfp
      if (decryptedToken.UserType === "Doctor") {
        axios
          .get(`/api/getDoctors?email=${decryptedToken.Email}`)
          .then((response) => {
            dispatch(changeDocPFP(response.data.ProfilePicture));
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else if (decryptedToken.UserType === "Patient") {
        axios
          .get(`/api/getPatients?email=${decryptedToken.Email}`)
          .then((response) => {
            dispatch(changePtPFP(response.data.ProfilePicture));
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
      }
    }
  }, [currentUserType]);

  return (
    <>
      {" "}
      <header className="header sticky top-0 bg-white z-30">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <div className="flex justify-center items-center"
            onClick={()=>{
              homeSidebarOpen === false ? window.scrollTo(0, 0) : null
              homeSidebarOpen === true ? dispatch(closeHomeSidebar()) : dispatch(openHomeSidebar())
            }}
            >
            { currentUserType === "Doctor" || currentUserType === "Patient" ? <div id="mobile_btn ml-5" href="/">
              <span className="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div> : null}
            <div href="index.html" className="ml-[50px] navbar-brand logo">
              {/* // brand logo ------- */}
              {/* <img
                src="/assets/img/logo.png"
                className="img-fluid"
                alt="Logo"
              /> */}
            </div>
            </div>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link href="index.html" className="menu-logo">
                <img
                  src="/assets/img/logo.png"
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
              <Link id="menu_close" className="menu-close" href="/">
                <i className="fas fa-times"></i>
              </Link>
            </div>

            {currentUserType && (
              <ul className="main-nav">
                {/* // doctor */}

                {currentUserType === "Doctor" && (
                  <>
                    <li className="">
                      {/* <div className="flex flex-col justify-center">
                        <span className="absolute mx-2 ">
                          <svg
                            width="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
                              fill="#0D0D0D"
                            />
                          </svg>
                        </span>
                        <input
                          className="focus:outline-none w-[180px] py-2 px-8 rounded-lg border border-[#9B9D9B] "
                          type="text"
                          placeholder="Search Patients" 
                        />
                      </div> */}
                    </li>

                    {!router.pathname.includes("/doctor/") && (
                      <li
                        className={
                          router.pathname.includes("dashboard")
                            ? "active"
                            : null
                        }
                      >
                        <Link href="/doctor/dashboard">Dashboard</Link>
                      </li>
                    )}
                  </>
                )}

                {/* // patientt  */}
                {currentUserType === "Patient" && (
                  <>
                    {/* // seasrch doc , show it if current page is not home page */}
                    {router.pathname !== "/" && !router.pathname.includes("/search") &&  (
                      <li className="ml-2">
                        <div className="flex flex-col justify-center">
                          <span className="absolute mx-2 ">
                            <svg
                              width="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
                                fill="#0D0D0D"
                              />
                            </svg>
                          </span>
                          <input
                            className="focus:outline-none w-[250px] py-2 px-8 rounded-lg border border-[#9B9D9B] "
                            type="text"
                            placeholder="Search Doctors"
                          />
                        </div>
                      </li>
                    )}
                    
                  </>
                )}

                {/* <li> */}
                {/* <Link href={"/admin/Dashboard"}> */}
                {/* <Link href="/" target="_blank"> */}
                {/* | &nbsp; &nbsp; &nbsp; Admin */}
                {/* </Link> */}
                {/* </Link>
                </li> */}
              </ul>
            )}
          </div>

          <ul className="nav header-navbar-rht">
            {currentUserType && (
              <li>
                {/* profile */}
                <button
                  className="absolute  right-[5px] cursor-pointer h-full  "
                  onClick={toggleDropdown}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsOpen(false);
                    }, 100);
                  }}
                >
                  <div className="flex justify-center items-center mr-3 ml-2   ">
                    <div className="flex justify-center items-center h-[full]">
                      <div className=" rounded-full ">
                        <img
                        height={10}
                        width={10}
                          className="w-[35px] h-[35px] rounded-full"
                          src={`${
                            currentUserType === "Doctor"
                              ? docPFP.length > 0
                                ? docPFP
                                : "/dummy.jpeg"
                              : ptPFP.length > 0
                              ? "/dummy.jpeg"
                              : "/dummy.jpeg"
                          }`}
                          alt="avatar"
                        />
        
                      </div>
                      <div className="mr-2 ml-1">
                        <i
                          className={`${
                            isOpen ? " rotate-180 transition-transform " : null
                          } hidden md:block ml-2 text-zinc-700 fa-solid fa-angle-down`}
                        ></i>
                      </div>
                    </div>

                    {/* dropdown  */}
                    <div className="absolute z-40 right-[199px] top-[12vh] ">
                      {isOpen && (
                        <div className="absolute  w-[200px] bg-white rounded-md shadow-sm ">
                          {/* Dropdown Items */}
                          <div className=" px-4 py-3 flex border-b-zinc-200 border-b-[1px]">
                            <div className=" rounded-full ">
                              <img
                                src={`${
                                  currentUserType === "Doctor"
                                    ? docPFP.length > 0
                                      ? docPFP
                                      : "/dummy.jpeg"
                                    : ptPFP.length > 0
                                    ? ptPFP
                                    : "/dummy.jpeg"
                                }`}
                                alt="admin-avatar"
                                className="w-[40px] h-[40px]  rounded-full"
                              />
                            </div>
                            <div className="ml-4 flex flex-col">
                              {/* // name  */}
                              <p className=" text-[15px] text-left">
                                {"Aditya"}
                              </p>
                              <p className="text-[13px] text-zinc-400  ">
                                {currentUserType}
                              </p>
                            </div>
                          </div>
                          <Link
                            href={`${
                              currentUserType === "Doctor"
                                ? "/doctor/dashboard"
                                : "/patient/dashboard"
                            }`}
                          >
                            <div className=" text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200 hover:text-black border-b-zinc-200 border-b-[1px]">
                              Dashboard
                            </div>
                          </Link>
                          <Link
                            href={
                              currentUserType === "Doctor"
                                ? "/doctor/profile-settings"
                                : currentUserType === "Patient"
                                ? "/patient/profile-settings"
                                : null
                            }
                          >
                            <div className="text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200  hover:text-black border-b-zinc-200 border-b-[1px]">
                              Profile Settings
                            </div>
                          </Link>
                          <Link
                            href=""
                            onClick={() => {
                              toast("Logging out...", emitterConfig);
                              
                              // first decrypt the token
                              let token = localStorage.getItem("token");
                              let decryptedToken = Jwt.decode(
                                token,
                                process.env.JWT_SECRET
                              );

                              // UPDATING LAST VISIT --
                              const updateData = {
                                Email: decryptedToken.Email,
                                LastVisit: new Date(Date.now()),
                              };
                              if (decryptedToken.UserType === "Patient") {
                                axios
                                  .put(`/api/updatePatients`, updateData)
                                  .catch((error) => {
                                    console.log(error.message);
                                  });
                              } else if (decryptedToken.UserType === "Doctor") {
                                axios
                                  .put(`/api/updateDoctors`, updateData)
                                  .catch((error) => {
                                    console.log(error.message);
                                  });
                              }
                              
                              setTimeout(() => {
                                localStorage.removeItem("token");
                                dispatch(changeUserType(null));
                                router.push("/")
                              }, 1000);
                            }}
                          >
                            <div className="text-left px-4 text-[14px] text-gray-500 font-medium py-2 hover:bg-zinc-200  hover:text-black border-b-zinc-200 border-b-[1px]">
                              Logout
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            )}

            {router.pathname === "/login" ||
            router.pathname === "/register" ||
            router.pathname === "/admin-login" ||
            router.pathname === "/admin-register" ? null : (
              <>
                {
                  // check if already loggein
                  currentUserType === null ? (
                    <li className="nav-item">
                      <Link className="nav-link header-login" href="/login">
                        login / Signup{" "}
                      </Link>
                    </li>
                  ) : null
                }
              </>
            )}
          </ul>
        </nav>
      </header>
      {/* // toast container  */}
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

export default Navbar;
