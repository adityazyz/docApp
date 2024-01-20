import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { changeUserType } from "../slices/userType";


function PtSidebar() {
  const dispatch = useDispatch();
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen);

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

  const ptPFP = useSelector((state) => state.ptPFP.ProfilePicture);

  const router = useRouter();

  const [name, setName] = useState("");

  const currentUserType = useSelector((state) => state.userType.value);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
    let myEmail = decryptedToken.Email;


    axios
      .get(`/api/getPatients?email=${myEmail}`)
      .then((response) => {
        setName(`${response.data.FirstName} ${response.data.LastName}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  }, []);

  const logout = () => {
    toast("Logging out...", emitterConfig);

    // first decrypt the token
    let token = localStorage.getItem("token");
    let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

    // UPDATING LAST VISIT --
    const updateData = {
      Email: decryptedToken.Email,
      LastVisit: new Date(Date.now()),
    };
    
    axios.put(`/api/updatePatients`, updateData).catch((error) => {
        console.log(error.message);
    });
    

    setTimeout(() => {
      localStorage.removeItem("token");
      dispatch(changeUserType(null));
      router.push("/");
    }, 1000);
  };

  return (
    <>
    {currentUserType && (homeSidebarOpen === true  && currentUserType === "Patient" )&& <div className={
      `absolute left-0 w-[277px] z-30 ${router.pathname === "/" ? "mt-[83px]" : "mt-[165px]"}`
    }>
      {/*<!-- Profile Sidebar -->*/}
      <div className="profile-sidebar ">
        <div className="widget-profile pro-widget-content">
          <div className="profile-info-widget">
            <Link href="#" className="booking-doc-img">
              <img
                src={`${ptPFP.length === 0 ? "/dummy.jpeg" : ptPFP}`}
                alt="User Image"
              />
            </Link>
            <div className="profile-det-info">
              <h3>{name}</h3>

              <div className="patient-details mt-2">
                <h5>
                  <i className="fas fa-birthday-cake"></i> 24 Jul 1983, 38 years
                </h5>
                <h5 className="mb-0">
                  <i className="fas fa-map-marker-alt"></i> Newyork, USA
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-widget ">
          <nav className="dashboard-menu">
            <ul >
              <li
                className={` ml-4 ${
                  router.pathname.includes("dashboard") ? "active" : null
                }`}
              >
                <Link href="/patient/dashboard">
                  <i className="fas fa-columns"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li
                className={` ml-4  ${
                  router.pathname.includes("favourites") ? "active" : null
                }`}
              >
                <Link href="/patient/favourites">
                  <i class="fas fa-bookmark"></i>
                  <span>Favourites</span>
                </Link>
              </li>

              <li
                className={` ml-4 ${
                  router.pathname.includes("message") ? "active" : null
                }`}
              >
                <Link href="/patient/message">
                  <i className="fas fa-comments"></i>
                  <span>Message</span>
                  <small className="unread-msg">23</small>
                </Link>
              </li>
              <li
                className={` ml-4  ${
                  router.pathname.includes("profile-settings") ? "active" : null
                }`}
              >
                <Link href="/patient/profile-settings">
                  <i className="fas fa-user-cog"></i>
                  <span>Profile Settings</span>
                </Link>
              </li>

              <li
                className={` ml-4 ${
                  router.pathname.includes("change-password") ? "active" : null
                }`}
              >
                <Link href="/patient/change-password">
                  <i className="fas fa-lock"></i>
                  <span>Change Password</span>
                </Link>
              </li> 
              <li>
                <Link href="" className=" ml-4 " onClick={logout}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/*<!-- /Profile Sidebar -->*/}

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
    </div>}
    </>
  );
}

export default PtSidebar;
