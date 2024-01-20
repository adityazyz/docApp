import React, {  useState } from "react";
import { useSelector} from "react-redux";
import { useRouter } from 'next/router'
import axios from "axios"; 
import supabase from "../../../../middleware/supabaseConfig";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";

import {FaEye, FaEyeSlash} from "react-icons/fa"


function ProfileSettings() {
  const router = useRouter();
  const BUCKET = "pt-pfp";
  const homeSidebarOpen = useSelector((state)=>state.sidebar.homeSidebarOpen);

  const [showPassword, setShowPassword] = useState(false);

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

 
  const websiteColorDark = useSelector(
    (state) => state.website.websiteColorDark
  );
  const uploadStyle = {
    backgroundColor: websiteColorDark,
  };

  const [data, setData] = useState({
    UserType : "Patient",
    UserName: "",
    ProfilePicture: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    BloodGroup: "",
    Gender: "",
    Email: "",
    Password : "",
    Mobile : {
      Number : "",
      iso2 : "",
      dialCode : ""
    },
    Address: "",
    City: "",
    State: "",
    ZipCode: "",
    Country: "",
  });

  const [profilePicUrl, setProfilePicUrl] = useState("");

  const [number, setNumber] = useState("");
  const [iso2, setIso2] = useState("");
  const [dialCode, setDialCode] = useState("");


  setTimeout(() => {
    // for mobile country dropdown
    var input = document.querySelector("#Mobile");

    window.intlTelInput(input, {
      // options Here
      allowDropdown: true,
      autoInsertDialCode: true,
      autoPlaceholder: "polite",
      customPlaceholder: null,
      dropdownContainer: null,
      excludeCountries: [],
      formatOnDisplay: true,
      geoIpLookup: null,
      hiddenInput: "",
      initialCountry: iso2 === "" ? "in" : iso2,
      localizedCountries: null,
      nationalMode: true,
      preferredCountries: ["us", "gb", "in"],
      separateDialCode: false,
      showFlags: true,
      utilsScript: "",
    });
    // event handlers
    input.addEventListener("countrychange", function () {
      var iti = window.intlTelInputGlobals.getInstance(input);
      const data = iti.getSelectedCountryData();
      setDialCode(data.dialCode);
      setIso2(data.iso2);
    });
  }, 1000);
  
  const saveToCloud = async(file)=>{
    // function to get public url
    async function getPublicURL(filePath) {
      const publicURL = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);
      return publicURL;
    }

    toast("Uploading profile picture..", emitterConfig);

    // upload img >>>>>>>>>>>>>>>>>>
    try {
      let arr = file.name.split(".");
      let extension = arr[(arr.length - 1)]; // extracting file extention

      let newFileName = `pt_pfp-${Date.now()}-${extension}`;
      // Use the Supabase client to upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(newFileName, file);

      if (error) {
        console.error("Error uploading file:", error.message); 
      } else {
        // get the public url
        let fileUrl = await getPublicURL(data.path);
        fileUrl = fileUrl.data.publicUrl;
        setProfilePicUrl(fileUrl);
        toast.success("Uploaded Successfully.", emitterConfig)

      }
    } catch (error) {
      console.log({ error });
    }
  }

  const deleteFromCloud = async (path)=>{
    try {
      await supabase.storage
        .from(BUCKET)
        .remove([path]);

    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  const handleChange = (e) =>{
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) =>{

    e.preventDefault();

    const isEmail = ( email) => {
      // Regular expression to check if string is email
      const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      return regexExp.test(email); // true
    };

    let updateData = data;

    if(updateData.BloodGroup === "Select"){
      updateData.BloodGroup = "";
    }

    // set pfp 
    updateData.ProfilePicture = profilePicUrl;

    updateData["Mobile"]= {
      Number : number,
      iso2 : iso2,
      dialCode : dialCode
    }

    if(isEmail(updateData.Email)===false){
      toast.error("Please provide correct email.",emitterConfig)
    }else if(updateData.Password.length === 0 || updateData.FirstName.length === 0 || updateData.LastName.length === 0 || updateData.UserName.length === 0 || number.length ===0){
      toast.error("Please fill all basic info.",emitterConfig)
    }else if(updateData.Password.length < 6){
      toast.error("Minimum password lenght is 6 characters.",emitterConfig)
    }else if(updateData.FirstName.length < 3 || updateData.LastName.length < 3){
      toast.error("Minimum name lenght is 3 characters.",emitterConfig)
    }else if(updateData.UserName.length < 4){
      toast.error("Minimum UserName lenght is 4 characters.",emitterConfig)
    }else if(number.length < 10){
      toast.error("Please provide correct phone number. ",emitterConfig)
    }else{
      axios.post("/api/register", updateData )
      .then((response)=>{
      if(response.data.success === false){
          toast.error(response.data.message, emitterConfig);
      }else{
          toast.success("Registered Successfully !", emitterConfig)
          setTimeout(() => {
              router.back();
          }, 1000);
      }
    })
    }
  }

  const dateBuilder = (dateString) => {
    const date = new Date(`${dateString} 00:00:00`); // The Date object you want to convert

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const offset = date.getTimezoneOffset();

    const formattedDate = `${dayOfWeek} ${month} ${day} ${year} ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")} GMT${offset >= 0 ? "+" : "-"}${Math.abs(offset / 60)
      .toString()
      .padStart(2, "0")}${Math.abs(offset % 60)
      .toString()
      .padStart(2, "0")} (India Standard Time)`;

    return new Date(formattedDate);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };



  return (
    <>
      {data && <div className={`${homeSidebarOpen ? "ml-2 md:ml-[273px]" : "ml-2"} w-auto container-fluid mt-[21px] frame `}>
        <div className="row">
          <div className="col-md-7 col-lg-8 col-xl-9 w-auto">
            <div className={`card  ${homeSidebarOpen === true ? "w-full" : "w-full"}`}>
              <div className={`card-body `}>
                {/* <!-- Profile Settings Form --> */}
                <>
                  <div className={`row form-row`}>
                    <div className="">
                      <div className="form-group">
                        <div className="change-avatar">
                          <div className="profile-img">
                            <img src={`${profilePicUrl.length === 0 ? "/dummy.jpeg" : profilePicUrl}`} alt="User Image" />
                          </div>
                          <div className="upload-img">
                            <div
                              className="change-photo-btn "
                              style={uploadStyle}
                            >
                              <span>
                                <i className="fa fa-upload"></i> Upload Photo
                              </span>
                              <input type="file" className="upload"  onChange={(e)=>{
                                if(profilePicUrl.length > 0){
                                  deleteFromCloud(profilePicUrl)
                                }
                                saveToCloud(e.target.files[0])
                              }}/>
                            </div>
                            <small className="form-text text-muted">
                              Allowed JPG, GIF or PNG. Max size of 2MB
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Email ID</label>
                        <input
                          type="email"
                          className="form-control"
                          value={data.Email}
                          name="Email"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                  <label className="mb-1">
                        Password <span className="text-danger">*</span>
                      </label>
                  <div className="form-group form-focus">
                        <div className="form-control flex items-center">
                        <input
                          type={`${showPassword === true ? "Text": "Password"}`}
                          className=" floating w-[92%] outline-none  border-none m-0 p-0"
                          placeholder="Password"
                          name="Password"
                          value={data.Password}
                          onChange={handleChange}
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
                  </div>



                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={data.FirstName}
                          name="FirstName"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={data.LastName}
                          name="LastName"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                    <div className="form-group">
                      <label className="mb-2">
                        Username <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text h-12" id="basic-addon1">
                            @
                          </span>
                        </div> 
                        <input
                          value={data.UserName}
                          onChange={handleChange}
                          type="text"
                          name= "UserName"
                          className="form-control"
                          placeholder="Username"
                        />
                      </div>
                    </div>
                  </div>

                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Date of Birth</label>

                        

                        <div
                        className="z-30 form-control flex justify-between items-center"
                        onClick={() => {
                          const element = document.getElementById("dtPicker");
                          element.click();
                        }}
                      >
                        <DatePicker
                          className=" outline-none"
                          id="dtPicker"
                          selected={
                            data.DateOfBirth
                              ? dateBuilder(data.DateOfBirth)
                              : null
                          }
                          onChange={(date) => {
                            setData({
                              ...data,
                              DateOfBirth: formatDate(date),
                            });
                          }}
                        />

                        <AiOutlineCalendar className="h-5 w-5 " />
                      </div>

                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Blood Group</label>
                        <select className="form-control select" name="BloodGroup"
                        onChange={handleChange}
                        value={(data.BloodGroup.length === 0 ? "Select" : data.BloodGroup)}>
                          <option>Select</option>
                          <option>A-</option>
                          <option>A+</option>
                          <option>B-</option>
                          <option>B+</option>
                          <option>AB-</option>
                          <option>AB+</option>
                          <option>O-</option>
                          <option>O+</option>
                        </select>
                      </div>
                    </div>
                    

                  
                    <div className="col-md-6">
                    <div className="form-group flex flex-col">
                      <label className="mb-2">Phone Number</label>
                      <div className="flex relative form-control p-0 outline-none border-r-0  border-l-0 border-t-0 border-b-0 ">
                        
                          <input
                            className="form-control w-0 overflow-visible  absolute left-0"
                            id="Mobile"
                            type="text"
                          />
                        

                        <input
                          type="tel"
                          name="Mobile"
                          value={number}
                          style={ {paddingLeft : "55px"} }
                          onChange={(e) => {
                            setNumber(e.target.value);
                          }}
                          className=" absolute left-0  form-control "
                          
                        />
                      </div>
                    </div>
                  </div>



                    <div className="col-12">
                      <div className="form-group">
                        <label className="mb-2">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={data.Address}
                          name="Address"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">City</label>
                        <input
                          type="text"
                          className="form-control"
                          value={data.City}
                          name="City"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={data.State}
                          name="State"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={data.ZipCode}
                          name="ZipCode"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="mb-2">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          value={data.Country}
                          name="Country"
                          onChange={handleChange}
                        /> 
                      </div>
                    </div>
                  </div> 
                  <div className="submit-section">
                  <button
                      type="submit"
                      className="btn btn-danger submit-btn mt-4"
                      onClick={()=>{
                        router.back()
                      }}
                    > 
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn mt-4"
                      onClick={handleSubmit}
                    > 
                      Create Account 
                    </button>
                  </div>
                </>
                {/* <!-- /Profile Settings Form --> */}
              </div>
            </div>
          </div>
        </div>
      </div>}

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

export default ProfileSettings;
