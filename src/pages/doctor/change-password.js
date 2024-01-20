import React, { useState } from "react";
import Jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";


function ChangePassword() {
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

  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen)
  

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
      // get email from local storage
      const token = localStorage.getItem("token");
      if (token !== null) {
        let Email = "";

        // decode it and use values
        let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
        Email = decryptedToken.Email;

        // make api call to update password
      axios.put("/api/changeDocPass", {
        Email : Email,
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
  }

  return (
    <div className={`${homeSidebarOpen ? "ml-2 md:ml-[275px]" : "ml-2"}  frame scroll-m-3 rounded-sm w-auto h-[125vh]  container-fluid mt-[20px] `}>
      {/* <!-- /Change Password Form --> */}
      <form className=" py-4 px-4   border-1 border-gray-200 bg-white">
        <div className="form-group">
          <label className="mb-3">Old Password</label>
          <input type="password" className="form-control w-[40vw]" 
          value={oldPass}
          onChange={(e)=>{setOldPass(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label className="mb-3">New Password</label>
          <input type="password" className="form-control w-[40vw]" 
          value={newPass1}
          onChange={(e)=>{setNewPass1(e.target.value)}}
          />
        </div>
        <div className="form-group"> 
          <label className="mb-3">Confirm Password</label>
          <input type="password" className="form-control w-[40vw]" 
          value={newPass2}
          onChange={(e)=>{setNewPass2(e.target.value)}}
          />
        </div>
        <div className="submit-section ">
          <button type="submit" onClick={handlePasswordUpdate} className="btn btn-primary submit-btn mt-4">
            Save Changes
          </button>
        </div>
      </form>
      {/* <!-- /Change Password Form --> */}

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
    </div>
  );
}

export default ChangePassword;
