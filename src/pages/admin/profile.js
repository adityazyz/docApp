import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import AdminModal from "../../../components/AdminModal";
import axios from "axios";
import Jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)
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

  let profilePic = useSelector((state)=>state.adminPFP.ProfilePicture)

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const [aboutSelected, setAboutSelected] = useState(true);
  const [passwordSelected, setPasswordSelected] = useState(false);

  const [adminData, setAdminData] = useState();

  const [oldPass, setOldPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");

 

  const handlePasswordUpdate = (e)=>{
    e.preventDefault();

    if(oldPass === "" || newPass1 === "" || newPass2 === ""){
      toast.error("Fill all the password fields.", emitterConfig);
    }else if(newPass1 != newPass2){
      toast.error("New passwords did not match.")
    }else{
      // make api call to update password
      axios.put("/api/changeAdminPass", {
        Email : adminData.Email,
        OldPassword : oldPass,
        NewPassword : newPass1
      })
      .then((response)=>{
        if(response.data.success === true){
          toast.success(response.data.message, emitterConfig);
          setOldPass("");
          setNewPass1("");
          setNewPass2("");
        }else if(response.data.success === false){
          toast.error(response.data.message, emitterConfig);
        }
      })
      .catch((error)=>{
        console.log({error});
      })
    }
  }

  const getAdminData = ()=>{
    const token = localStorage.getItem("token");
    // decrypt jwt token
    let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

    const adminEmail = decryptedToken.Email;

    axios
        .get(`/api/getAdmin?email=${adminEmail}`)
        .then((response) => {
          let data = response.data[0];
          setAdminData(data);

          // also set profile pic
          
        })
        .catch((error) => {
          console.log({ error });
        });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      // getting admin data and updating our useState variable
      getAdminData()
      
    }else{
      router.push("/")
    }
  }, []);

  // using values from redux store
  const websiteColorDark = useSelector(
    (state) => state.website.websiteColorDark
  );
  const themeBgDark = {
    backgroundColor: websiteColorDark,
    color: "white",
  };

  // change string to long date
  const str2date = (str)=>{
    let date = new Date(str);
    date = date.toString();
    let dateArr = date.split(" ");
    return `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`
  }

  return (
    <>
      <div className={`${adminSidebarOpen === true ? "ml-[10px] md:ml-[262px]" : "ml-[10px]" } row  pr-4 `}>
        <div className="col-md-12 ">
          {/* // ----------------------top info bar  */}
          <div className="profile-header   ">
            {adminData && (
              <div className="row align-items-center border-1 border-gray-100 rounded-[3px] bg-white w-auto flex  mx-3 ">
                <div className="col-auto profile-image p-4 pb-2">
                  <a href="#">
                    <Image
                      height={120}
                      width={120}
                      className="rounded-circle h-24 w-24" 
                      alt="User Image"
                      src={
                        profilePic.length > 0
                          ? profilePic
                          : "/dummy.jpeg"
                      }
                    />
                  </a>
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="user-name mb-1 text-xl">{adminData.Name}</h4>
                  <h6 className="text-muted text-gray-600 font-bold mb-2">
                    {adminData.Email}
                  </h6>
                  {adminData.Address.State.length > 0 &&
                    adminData.Address.Country.length > 0 && (
                      <div className="user-Location text-gray-700">
                        <i className="fa fa-map-marker"></i>{" "}
                        {adminData.Address.State}, {adminData.Address.Country}
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* //// --------------- to switch b/w about and password */}
          <div className="profile-menu border-1 border-gray-100 rounded-[3px] mx-3  bg-white py-3 px-4">
            <ul className="nav nav-tabs nav-tabs-solid bg-white">
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={aboutSelected ? themeBgDark : null}
                  onClick={() => {
                    setAboutSelected(true);
                    setPasswordSelected(false);
                  }}
                >
                  About
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  style={passwordSelected ? themeBgDark : null}
                  onClick={() => {
                    setPasswordSelected(true);
                    setAboutSelected(false);
                  }}
                >
                  Password
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content profile-tab-cont">
            {/* <!-- Personal Details Tab --> */}
            <div className="tab-pane fade show active" id="per_details_tab">
              {/* <!-- Personal Details --> */}
              <div className="row">
                <div className="col-lg-12">
                  {/* --------------------- About  */}
                  {aboutSelected === true && (
                    <div className="card mx-3">
                      {adminData && (
                        <div className="card-body">
                          <h5 className="card-title d-flex justify-content-between">
                            <span className="text-lg">Personal Details</span>
                            <button
                              className={`edit-link text-gray-600 hover:text-cyan-500`}
                              onClick={() => {
                                router.push({pathname: "/admin/edit/admin-profile", query : {data : JSON.stringify(adminData)}},
                                "/admin/edit/admin-profile")
                              }}
                            >
                              <i className="fa fa-edit mr-1"></i>
                              Edit
                            </button>
                          </h5>

                          {/* // name  */}
                          <div className="row">
                            <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                              Name
                            </p>
                            <p className="col-sm-10">{adminData.Name}</p>
                          </div>

                          {/* // dob   */}
                          {adminData.DateOfBirth != null && (
                            <div className="row">
                              <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                Date of Birth
                              </p>
                              <p className="col-sm-10">{str2date(adminData.DateOfBirth)}</p>
                            </div>
                          )}

                          {/* // email  */}
                          <div className="row">
                            <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                              Email ID
                            </p>
                            <p className="col-sm-10">{adminData.Email}</p>
                          </div>

                          {/* // mobile  */}
                          {adminData.Mobile && (
                            <div className="row">
                              <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                                Mobile
                              </p>
                              <p className="col-sm-10">{adminData.Mobile}</p>
                            </div>
                          )}

                          {/* // address  */}
                          {adminData.Address.State &&
                            adminData.Address.Country && (
                              <div className="row">
                                <p className="col-sm-2 text-muted text-sm-right mb-0">
                                  Address
                                </p>
                                <div className="col-sm-10 mb-0">
                                  {adminData.Address.Address && (
                                    <>
                                      <div className="mb-[6px]">{adminData.Address.Address},</div>
                                    </>
                                  )}

                                  {adminData.Address.City && (
                                    <>
                                      <div className="mb-[6px]">{adminData.Address.City},</div>
                                    </>
                                  )}

                                  {adminData.Address.State &&
                                    adminData.Address.ZipCode && (
                                      <div className="mb-[6px]">
                                        {adminData.Address.State} -{" "}{adminData.Address.ZipCode},
                                      </div>
                                    )}

                                  {adminData.Address.Country && (
                                    <>{adminData.Address.Country}.</>
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* <!-- /Personal Details --> */}
            </div>
            {/* <!-- /Personal Details Tab --> */}

            {/* <!-- Change Password Tab --> */}
            {passwordSelected === true && (
              <div id="password_tab" className=" mx-3 ">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-lg mb-3">Change Password</h5>
                    <div className="row">
                      <div className="col-md-10 col-lg-6">
                        <form>
                          <div className="form-group">
                            <label className="mb-2">Old Password</label>
                            <input type="password" className="form-control" 
                            value={oldPass}
                            onChange={(e)=>{
                              setOldPass(e.target.value);
                            }}
                            />
                          </div>
                          <div className="form-group">
                            <label className="mb-2">New Password</label>
                            <input type="password" className="form-control" 
                            value={newPass1}
                            onChange={(e)=>{
                              setNewPass1(e.target.value);
                            }}
                            />
                          </div>
                          <div className="form-group">
                            <label className="mb-2">Confirm Password</label>
                            <input type="password" className="form-control" 
                            value={newPass2}
                            onChange={(e)=>{
                              setNewPass2(e.target.value);
                            }}
                            />
                          </div>
                          <button className="btn btn-primary" type="submit"
                          onClick={handlePasswordUpdate}
                          >
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <!-- /Change Password Tab --> */}
          </div>
        </div>
      </div>
      
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

export default Profile;
