import React, { useEffect, useState } from "react";
import Jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";


function SocialMedia() {
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen)
  
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

  const [renderFields, setRenderFields] = useState(false);
  const [Email, setEmail] = useState();
  const [myUrls, setMyUrls] = useState({
    // social handles here
    
  })

  // setting myUrls value from db
  useEffect(() => {
    const token = localStorage.getItem("token");

     let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
     let myEmail = decryptedToken.Email;

     axios.get(`/api/getDoctors?email=${myEmail}`)
    .then((response)=>{
      console.log(response.data);
      setMyUrls(response.data.Socials);

      setEmail(response.data.Email);

      setRenderFields(true);
    })
    .catch((error)=>{console.log(error.message)})
  

  }, [])
  

  const handleChange = (e)=>{
    setMyUrls({ ...myUrls, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    // Submit the url back to db 
    // get data of the email in token
    const updateData = {
      Email,
      Socials : myUrls
    }

    axios.put(`/api/updateDoctors`, updateData)
    .then(()=>{
      toast.success("URLs Updated !", emitterConfig);
      setchangeMade(true);
    })
    .catch((error)=>{console.log(error.message)})


    
  }


  return (
    <div className={` ${homeSidebarOpen ? "ml-2 md:ml-[275px]" : "ml-2"}  frame scroll-m-3 rounded-sm w-auto h-[125vh]  container-fluid mt-[20px]`}>
     
      {/* <!-- /Change Password Form --> */}
      <form className=" py-4 px-4  mr-[11px] border-1 border-gray-200 bg-white">
      {Object.keys(myUrls).map((item, index)=>{
          return <div key={`${item}-${index}`}>
          {(renderFields === true) && <div  className="form-group" >
          <label className="mb-3">{item} URL</label>
          <input type="text" 
          name={item}
          className="form-control w-[40vw]" 
          value={myUrls[item]}
          onChange={handleChange}
          />
        </div>}
          </div>
        })}

        {/* // save button  */}
        <div className="submit-section ">
          <button type="submit" onClick={handleSubmit} className="btn btn-primary submit-btn mt-4">
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

export default SocialMedia;
