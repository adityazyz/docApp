// make it working and then applyion !!!!!
// import { useLockBodyScroll } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import DropzoneComponent from "../components/DropZoneComponent";
import DropdownServ from "../components/DropdownServ";
import DropdownSpec from "../components/DropdownSpec";
import Image from "next/image";
import axios from "axios";
import supabase from "../middleware/supabaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";
import {FaEyeSlash,FaEye} from "react-icons/fa";
import { useRouter } from "next/router";

// change doc pfp from everywhere after final submit

// type = Dashboard/ Modal
function AddDoc() {

  const router = useRouter();

  const [specArray, setSpecArray] = useState();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  // for mobile
  const [number, setNumber] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [iso2, setIso2] = useState("in");

//   time

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
      initialCountry: iso2 ,
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
      const myData = iti.getSelectedCountryData();
      console.log(myData.dialCode)
      setDialCode(myData.dialCode);
      setIso2(myData.iso2);
    });
  }, 1500);

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

  const clinicImageLimit = 5;

  const homeSidebarOpen = useSelector((state) => state.sidebar.homeSidebarOpen);

  const CLINIC_BUCKET = "clinic-images";
  const PFP_BUCKET = "doc-pfp";

  const websiteColorDark = useSelector(
    (state) => state.website.websiteColorDark
  );
  const uploadStyle = {
    backgroundColor: websiteColorDark,
  };

  // selected spec and selected serv..and memberships ...and functions to change them
  // update the values onLoad and use it in the data
  const [specSelected, setSpecSelected] = useState([]);
  const [servSelected, setServSelected] = useState([]);
  const [clinicPicSelected, setClinicPicSelected] = useState([]);
  const [membSelected, setMembSelected] = useState([]);
  const handleSpecChange = (arr) => {
    setSpecSelected(arr);
  };
  const handleServChange = (arr) => {
    setServSelected(arr);
  };
  const handleCliniPicChange = (arr) => {
    setClinicPicSelected(arr);
  };
  const handleMembChange = (arr) => {
    setMembSelected(arr);
  };

  // --------------------------------------------------------------------------
  // dynamic fields useState variables
  // set initial value from fetched data...and pass it as a value in useState data variable
  const [educationData, setEducationData] = useState([
    { Degree: "", College: "", YearOfCompletion: "" },
  ]);
  const [experienceData, setExperienceData] = useState([
    { Place: "", From: "", Till: "", Designation: "" },
  ]);
  const [awardData, setAwardData] = useState([
    { AwardName: "", AwardYear: "", AwardBy: "" },
  ]);

  // record adding functions
  const addEducationData = () => {
    setEducationData((prevData) => [
      ...prevData,
      { Degree: "", College: "", YearOfCompletion: "" },
    ]);
  };
  const addExperienceData = () => {
    setExperienceData((prevData) => [
      ...prevData,
      { Place: "", From: "", Till: "", Designation: "" },
    ]);
  };
  const addAwardData = () => {
    setAwardData((prevData) => [
      ...prevData,
      { AwardName: "", AwardYear: "", AwardBy: "" },
    ]);
  };

  // record removing function
  const removeEducationData = (index) => {
    setEducationData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };
  const removeExperienceData = (index) => {
    setExperienceData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };
  const removeAwardData = (index) => {
    setAwardData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  //handling the change of fields
  const handleEducationChange = (index, key, value) => {
    setEducationData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [key]: value,
      };
      return newData;
    });
  };
  const handleExperienceChange = (index, key, value) => {
    setExperienceData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [key]: value,
      };
      return newData;
    });
  };
  const handleAwardChange = (index, key, value) => {
    setAwardData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [key]: value,
      };
      return newData;
    });
  };

  // --------------------------------------------------------------------------

  // free or custom
  const [pricingType, setPricingType] = useState("free");
  const handlePricingTypeChange = (e) => {
    setPricingType(e.target.value);
  };

  // take from data
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const [newEmail, setNewEmail] = useState("");

  // update it from data obj above, (array of urls)
  const [clinicPicUrls, setClinicPicUrls] = useState([]);

  const [data, setData] = useState({
    UserName: "",
    ProfilePicture: profilePicUrl,
    Email: newEmail,
    Password : password,
    FirstName: "",
    LastName: "",
    Mobile: {
      Number: number,
      iso2: iso2,
      dialCode: dialCode,
    },
    Gender: "",
    DateOfBirth: "",
    Biography: "",
    ClinicInfo: {
      ClinicName: "",
      ClinicAddress: "",
      ClinicImages: clinicPicUrls, // array of strings
    },
    Address: {
      Address: "",
      City: "",
      State: "",
      Country: "",
      ZipCode: "",
    },
    Pricing: 0,

    // set the below fields ...in useEffect as well
    Service: [
      {
        Specializations: specSelected,
        Services: servSelected,
      },
    ],
    Education: educationData,
    Experience: experienceData,
    Award: awardData,
    Memberships: membSelected,
    Registration: {
      RegistrationNumber: "",
      RegistrationYear: "",
    },
  });


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePricingChange = (e) => {
    setData({ ...data, [e.target.name]: parseInt(e.target.value) });
  };

  // upload functions // type = clinic/pfp
  const saveToCloud = async (file, bucket, type) => {
    type === "pfp" ? toast("Updating Image..", emitterConfig) : null;
    // function to get public url
    async function getPublicURL(filePath) {
      const publicURL = supabase.storage.from(bucket).getPublicUrl(filePath);
      return publicURL;
    }

    // upload img >>>>>>>>>>>>>>>>>>
    try {
      let arr = file.name.split(".");
      let extension = arr[arr.length - 1]; // extracting file extention

      let newFileName = `${type}-${newEmail}-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}-${extension}`;
      // Use the Supabase client to upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(newFileName, file);

      if (error) {
        console.error("Error uploading file : ", error.message);
      } else {
        // get the public url
        let fileUrl = await getPublicURL(data.path);
        fileUrl = fileUrl.data.publicUrl;
        if (type === "clinic") {
          return fileUrl; // return ..store it in array in handle submit
        } else if (type === "pfp") {
          setProfilePicUrl(fileUrl);
        }
        type === "pfp"
          ? toast.success("Image uploaded !", emitterConfig)
          : null;
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const deleteFromCloud = async (url, type) => {
    let bucket = "";
    if (type === "clinic") {
      bucket = "clinic-images";
    } else {
      bucket = "doc-pfp";
    }

    // extract path from old-url
    let arr = url.split("/");
    let path = arr[arr.length - 1];

    try {
      await supabase.storage.from(bucket).remove([path]);
      // console.log("old file deleted from cloud");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const removeUrls = (index) => {
    const Urls = [...clinicPicUrls];
    let removedUrl = Urls.splice(index, 1)[0];
    setClinicPicUrls(Urls); // update url list
    deleteFromCloud(removedUrl); // delete from cloud
  };

  // use-effect to get doc data from db and assigning the values
  useEffect(() => {
    // set spec array
    axios
      .get("/api/specGet")
      .then((response) => {
        function extractFieldValues(arr, fieldName) {
          return arr.map((obj) => obj[fieldName]);
        }
        setSpecArray(extractFieldValues(response.data.data, "name"));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleUploadClinicImages = () => {
    let uploadedUrls = clinicPicUrls; // also include current img urls

    // working starts here
    toast("Uploading Images...", emitterConfig);

    if (clinicPicSelected.length > 0) {
      clinicPicSelected.map(async (file) => {
        // wait for it to happen
        const url = await saveToCloud(file, CLINIC_BUCKET, "clinic");
        uploadedUrls.push(url);
      });

      // if uploadFinished ..mark it as true
      setClinicPicUrls(uploadedUrls);

      toast.success("upload finished");
    }
  };

  // final submit func
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmail = ( email) => {
        // Regular expression to check if string is email
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return regexExp.test(email); // true
      };

    let finalData = {
        UserType : "Doctor",
        UserName: data.UserName,
        ProfilePicture: profilePicUrl,
        Email: newEmail,
        Password : password,
        FirstName: data.FirstName,
        LastName: data.LastName,
        Mobile: {
          Number: number,
          iso2: iso2,
          dialCode: dialCode,
        },
        Gender: data.Gender,
        DateOfBirth: data.DateOfBirth,
        Biography: data.Biography,
        ClinicInfo: {
          ClinicName: data.ClinicInfo.ClinicName,
          ClinicAddress: data.ClinicInfo.ClinicAddress,
          ClinicImages: clinicPicUrls, // array of strings
        },
        Address: {
          Address: data.Address.Address,
          City: data.Address.City,
          State: data.Address.State,
          Country: data.Address.Country,
          ZipCode: data.Address.ZipCode,
        },
        Pricing: data.Pricing,
    
        // set the below fields ...in useEffect as well
        Service: [
          {
            Specializations: specSelected,
            Services: servSelected,
          },
        ],
        Education: educationData,
        Experience: experienceData,
        Award: awardData,
        Memberships: membSelected,
        Registration: {
          RegistrationNumber: data.Registration.RegistrationNumber,
          RegistrationYear: data.Registration.RegistrationYear,
        },
      }

      
      if(isEmail(newEmail)===false){
        toast.error("Please provide correct email.",emitterConfig)
      }else if(password.length === 0 || finalData.FirstName.length === 0 || finalData.LastName.length === 0 || finalData.UserName.length === 0 || number.length ===0){
        toast.error("Please fill all basic info.",emitterConfig)
      }else if(password.length < 6){
        toast.error("Minimum password lenght is 6 characters.",emitterConfig)
      }else if(finalData.FirstName.length < 3 || finalData.LastName.length < 3){
        toast.error("Minimum name lenght is 3 characters.",emitterConfig)
      }else if(finalData.UserName.length < 4){
        toast.error("Minimum UserName lenght is 4 characters.",emitterConfig)
      }else if(number.length < 10){
        toast.error("Please provide correct phone number. ",emitterConfig)
      }else{
        axios.post("/api/register", finalData )
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
      
      

  };

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
      <Head>
        <title>Profile Settings</title>
      </Head>
      <div
        className={`  w-auto h-[125vh] ${
          `${homeSidebarOpen ? "ml-2 md:ml-[275px]" : "ml-2"} `
        } scroll-m-3  container-fluid mt-[20px]`}
      >
        <div className="">
          <div className="w-[100%]">
            {/*<!-- Basic Information -->*/}
            <div className="card frame overflow-visible">
              <div className="card-body">
                <h4 className="card-title">Basic Information</h4>
                <div className="row form-row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="change-avatar">
                        <div className="profile-img">
                          <img
                            src={`${
                              profilePicUrl.length > 0
                                ? profilePicUrl
                                : "/dummy.jpeg"
                            }`}
                            alt="User Image"
                          />
                        </div>
                        <div className="upload-img">
                          <div
                            className={`change-photo-btn `}
                            style={uploadStyle}
                          >
                            <span>
                              <i className="fa fa-upload"></i> Upload Photo
                            </span>

                            <input
                              type="file"
                              className="upload"
                              disabled = {newEmail.length > 0 ? false : true}
                              onChange={async (e) => {
                                if(profilePicUrl.length > 0){
                                    deleteFromCloud(profilePicUrl, "pfp");
                                  }
                                  saveToCloud(
                                    e.target.files[0],
                                    PFP_BUCKET,
                                    "pfp"
                                  );
                              }}
                            />
                          </div>

                          <small className="form-text text-muted">
                            Allowed JPG, GIF or PNG. Max size of 2MB
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="mb-2">
                        Email <span className="text-danger">*</span>
                      </label>
                      <small className="form-text text-muted">
                        &nbsp;&nbsp;&nbsp; Enter email before uploading image
                      </small>
                      <input
                        name="Email"
                        type="email"
                        className="form-control"
                        value={newEmail}
                        onChange={(e) => {
                          setNewEmail(e.target.value);

                        }}
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
                  </div>

                  

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="mb-2">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text h-12" id="basic-addon1">
                            Dr
                          </span>
                        </div>
                        <input
                          name="FirstName"
                          value={data.FirstName}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="mb-2">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        name="LastName"
                        value={data.LastName}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
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

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="mb-2">Gender</label>
                      <select
                        className="form-control select"
                        name="Gender"
                        onChange={handleChange}
                      >
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-0">
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
                          value={number}
                          style={{ paddingLeft: "55px" }}
                          onChange={(e) => {
                            setNumber(e.target.value);
                          }}
                          className=" absolute left-0  form-control "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- /Basic Information -->*/}

            {newEmail.length > 0 && <>
            {/*<!-- About Me -->*/}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">About Me</h4>
                <div className="form-group mb-0">
                  <label className="mb-2">Biography</label>
                  <textarea
                    name="Biography"
                    value={data.Biography}
                    onChange={handleChange}
                    className="form-control"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
            {/*<!-- /About Me -->*/}

            {/*<!-- Clinic Info -->*/}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Clinic Info</h4>
                <div className="row form-row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label name className="mb-2">
                        Clinic Name
                      </label>
                      <input
                        type="text"
                        value={data.ClinicInfo.ClinicName}
                        onChange={(event) => {
                          setData((prevData) => ({
                            ...prevData,
                            ClinicInfo: {
                              ...prevData.ClinicInfo,
                              ClinicName: event.target.value,
                            },
                          }));
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="mb-2">Clinic Address</label>
                      <input
                        type="text"
                        value={data.ClinicInfo.ClinicAddress}
                        onChange={(event) => {
                          setData((prevData) => ({
                            ...prevData,
                            ClinicInfo: {
                              ...prevData.ClinicInfo,
                              ClinicAddress: event.target.value,
                            },
                          }));
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="mb-3 text-[18px]">
                        Clinic Images{" "}
                        <span className="text-sm"> &nbsp;( Limit : 5 )</span>
                      </label>

                      {clinicPicUrls.length > 0 && (
                        <div className="bg-gray-100 rounded-lg pt-1 pl-1 pb-1">
                          <div className="ml-2 my-1">Current Images :</div>
                          <div className={` flex flex-wrap`}>
                            <>
                              {clinicPicUrls.map((url, index) => {
                                return (
                                  <div div className="relative m-2 ml-0">
                                    <Image
                                      width={100}
                                      height={100}
                                      className=" h-[75px] w-[75px] rounded-lg"
                                      key={index}
                                      src={url}
                                      alt={`Image ${index}`}
                                    />
                                    <button
                                      className=" absolute top-1 right-1 h-5 w-5 btn btn-icon btn-danger btn-sm"
                                      onClick={() => {
                                        removeUrls(index);
                                      }}
                                    >
                                      {" "}
                                      <i className="far fa-trash-alt"></i>
                                    </button>
                                  </div>
                                );
                              })}
                            </>
                          </div>
                        </div>
                      )}

                      <DropzoneComponent
                        uploadFunc={handleUploadClinicImages}
                        updateFunc={handleCliniPicChange}
                        totalLimit = {clinicImageLimit}
                        limit={clinicImageLimit - clinicPicUrls.length}
                        judgeArr={clinicPicSelected}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- /Clinic Info -->*/}

            {/*<!-- Contact Details -->*/}
            <div className="card contact-card">
              <div className="card-body">
                <h4 className="card-title">Contact Details</h4>
                <div className="row form-row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="mb-2">Address</label>
                      <input
                        type="text"
                        name="Address"
                        value={data.Address.Address}
                        onChange={(event) => {
                          setData((prevData) => ({
                            ...prevData,
                            Address: {
                              ...prevData.Address,
                              Address: event.target.value,
                            },
                          }));
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label mb-2">City</label>
                      <input
                        type="text"
                        value={data.Address.City}
                        onChange={(event) => {
                          setData((prevData) => ({
                            ...prevData,
                            Address: {
                              ...prevData.Address,
                              City: event.target.value,
                            },
                          }));
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label mb-2">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={data.Address.State}
                        onChange={(event) => {
                          setData((prevData) => ({
                            ...prevData,
                            Address: {
                              ...prevData.Address,
                              State: event.target.value,
                            },
                          }));
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label mb-2">Country</label>
                      <input
                        type="text"
                        value={data.Address.Country}
                        onChange={(event) => {
                          setData((prevData) => ({
                            ...prevData,
                            Address: {
                              ...prevData.Address,
                              Country: event.target.value,
                            },
                          }));
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={data.Address.ZipCode}
                        onChange={(event) => {
                          setData((prevData) => ({
                            ...prevData,
                            Address: {
                              ...prevData.Address,
                              ZipCode: event.target.value,
                            },
                          }));
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- /Contact Details -->*/}

            {/*<!-- Pricing -->*/}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-3">Pricing</h4>

                <div className="form-group mb-0">
                  <div id="pricing_select">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        value="free"
                        onChange={handlePricingTypeChange}
                        checked={pricingType === "free"}
                        className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded focus:outline-none"
                      />

                      <label
                        className="custom-control-label ml-3 mt-[2px]"
                        for="free"
                      >
                        Free
                      </label>
                    </div>
                    <div className=" flex flex-col custom-control custom-radio custom-control-inline">
                      {/* // input and label  */}
                      <div className="my-2">
                        <input
                          type="radio"
                          value="custom"
                          onChange={handlePricingTypeChange}
                          checked={pricingType === "custom"}
                          className="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded focus:outline-none"
                        />

                        <label
                          className="custom-control-label ml-3 mt-[2px]"
                          for="custom"
                        >
                          Custom Price ($ per minute)
                        </label>
                      </div>

                      {/* // takes input in number ($) */}
                      {pricingType === "custom" && (
                        <input
                          type="number"
                          className="border-1 border-gray-300 rounded-sm ml-8 mt-2 outline-none bg-gray-50 h-9 w-24 pl-3 pr-1"
                          value={data.Pricing}
                          name="Pricing"
                          onChange={handlePricingChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- /Pricing -->*/}

            {/*<!-- Services and Specialization -->*/}
            <div className="card services-card">
              <div className="card-body">
                <h4 className="card-title">Specialization and Services </h4>

                <div className="form-group mb-0">
                  <label className="mb-2">Specialization </label>
                  {/* {console.log(handleSpecChange)} */}
                  {specArray && (
                    <DropdownSpec
                      email={newEmail}
                      itemArray={specArray}
                      preSelected={specSelected}
                      serv={servSelected}
                      updateSelectedArr={handleSpecChange}
                    />
                  )}

                  <small className="form-text text-muted mt-1">
                    Note : Type & Press enter to add new specialization
                  </small>
                </div>

                <div className="form-group">
                  <label className="mt-4 mb-2">Services</label>

                  {
                    <DropdownServ
                      title={"Services"}
                      preSelected={servSelected}
                      updateSelectedArr={handleServChange}
                    />
                  }

                  <small className="form-text text-muted mt-1">
                    Note : Type & Press enter to add new services
                  </small>
                </div>
              </div>
            </div>
            {/*<!-- /Services and Specialization -->*/}

            {/*<!-- Education -->*/}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Education</h4>
                <div className="education-info">
                  <>
                    <>
                      {educationData.map((row, i) => {
                        return (
                          <>
                            {" "}
                            <div
                              key={`big-${i}`}
                              className=" row form-row"
                            >
                              {Object.keys(row).map((field, index) => {
                                return field !== "_id" ? (
                                  <div
                                    key={`${row}-${field}`}
                                    className="col-md-6 "
                                  >
                                    <div className="form-group">
                                      <label className="mb-2">
                                        {index === 2
                                          ? "Year of Completion"
                                          : field}
                                      </label>
                                      <input
                                        name={field}
                                        type="text"
                                        value={educationData[i][field]}
                                        className="form-control "
                                        onChange={(e) => {
                                          handleEducationChange(
                                            i,
                                            field,
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                ) : null;
                              })}
                              {i > 0 ? (
                              <button
                                className="form-group btn btn-danger h-11 w-11  ml-3 mt-[30px] lg:mb-[14px] lg:ml-2"
                                onClick={() => {
                                  removeEducationData(i);
                                }}
                              >
                                
                                <i className="far fa-trash-alt"></i>
                              </button>
                            ) : (
                              <div className="h-0 w-0 lg:h-11 lg:w-11 mb-[5px] ml-2"></div>
                            )}
                            </div>
                            {/* // delete button  */}
                            
                          </>
                        );
                      })}
                    </>
                  </>
                </div>
                <div className="add-more">
                  <button
                    onClick={addEducationData}
                    className="add-education flex justify-center items-center mt-2"
                  >
                    <i className="fa fa-plus-circle text-cyan-500"></i>
                    <span className="text-cyan-500 ml-2">Add More</span>
                  </button>
                </div>
              </div>
            </div>
            {/*<!-- /Education -->*/}

            {/*<!-- Experience -->*/}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Experience</h4>
                <div className="education-info">
                  <div className="row form-row education-cont">
                    <div className="">
                      {experienceData.map((row, i) => {
                        return (
                          <div
                            div
                            className=" pb-2"
                          >
                            {" "}
                            <div
                              key={`big-${i}`}
                              className="flex flex-col md:items-end  md:flex-row  flex-wrap p-2"
                            >
                              {Object.keys(row).map((field, index) => {
                                return field !== "_id" ? (
                                  <div
                                    key={`${row}-${field}`}
                                    className="  p-1 lg:p-3"
                                  >
                                    <div className="">
                                      <label className="mb-2">
                                        {index === 0 ? "Hospital Name" : field}
                                      </label>
                                      {console.log}

                                      <div className={` ${index === 3 ? "mr-3" : null}`}>
                                        {index === 1 || index === 2 ? (
                                          <DatePicker
                                            className="form-control w-[75vw] sm:w-[80vw] md:w-fit"
                                        
                                            // dateBuilder(data["Experience"][field])
                                            // data.Experience[field] === "" ?
                                            // : dateBuilder(data["Experience"][field])
                                            selected={
                                              experienceData[i][field].length >
                                              0
                                                ? dateBuilder(
                                                    experienceData[i][field]
                                                  )
                                                : null
                                            }
                                            onChange={(date) => {
                                              handleExperienceChange(
                                                i,
                                                field,
                                                formatDate(date)
                                              );
                                            }}
                                          />
                                        ) : (
                                          <input
                                            name={field}
                                            type="text"
                                            value={experienceData[i][field]}
                                            // ${index === 3 ? "mr-2" : ""} 
                                            className={`form-control`}
                                            onChange={(e) => {
                                              handleExperienceChange(
                                                i,
                                                field,
                                                e.target.value
                                              );
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ) : null;
                              })}
                              {/* // delete button  */}
                            {i > 0 ? (
                              <div className="flex items-center justify-center mt-1">
                                <button
                                className="  btn btn-danger h-11 w-11  mb-[5px] "
                                onClick={() => {
                                  removeExperienceData(i);
                                }}
                              >
                                {" "}
                                <i className="far fa-trash-alt "></i>
                              </button>
                              </div>
                            ) : (
                              <div className="h-0 w-0 lg:h-11 lg:w-11 mb-[5px] ml-2"></div>
                            )}
                            </div>
                            
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="add-more">
                  <button
                    onClick={addExperienceData}
                    className="add-education flex justify-center items-center mt-2"
                  >
                    <i className="fa fa-plus-circle text-cyan-500"></i>
                    <span className="text-cyan-500 ml-2">Add More</span>
                  </button>
                </div>
              </div>
            </div>
            {/*<!-- /Experience -->*/}

            {/*<!-- Awards -->*/}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Awards</h4>
                <div className="education-info">
                  <>
                    <>
                      {awardData.map((row, i) => {
                        return (
                          <>
                            
                            <div
                              key={`big-${i}`}
                              className="flex flex-col sm:items-end  sm:flex-row  flex-wrap p-2"
                            >
                              {Object.keys(row).map((field, index) => {
                                return field !== "_id" ? (
                                  <div
                                    key={`${row}-${field}`}
                                    className={`p-1 lg:p-3 ${index===2?"mr-3":null}`}
                                  >
                                    <div className="">
                                      <label className="mb-2">
                                        {index === 0
                                          ? "Award Name"
                                          : index === 1
                                          ? "Year"
                                          : "Award By"}
                                      </label>
                                      <input
                                        name={field}
                                        type="text"
                                        value={awardData[i][field]}
                                        className="form-control"
                                        onChange={(e) => {
                                          handleAwardChange(
                                            i,
                                            field,
                                            e.target.value
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                ) : null;
                              })}
                              {/* // delete button  */}
                            {i > 0 ? (
                              <button
                                className="  btn btn-danger h-11 w-11 ml-1 mt-2 mb-[8px] "
                                onClick={() => {
                                  removeAwardData(i);
                                }}
                              >
                                {" "}
                                <i className="far fa-trash-alt"></i>
                              </button>
                            ) : (
                              <div className="h-0 w-0 lg:h-11 lg:w-11 mb-[4px] ml-2"></div>
                            )}
                            </div>
                            
                          </>
                        );
                      })}
                    </>
                  </>
                </div>
                <div className="add-more">
                  <button
                    onClick={addAwardData}
                    className="add-education flex justify-center items-center mt-2"
                  >
                    <i className="fa fa-plus-circle text-cyan-500"></i>
                    <span className="text-cyan-500 ml-2">Add More</span>
                  </button>
                </div>
              </div>
            </div>
            {/*<!-- /Awards -->*/}

            {/*<!-- Memberships -->*/}
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Memberships</h4>

                <label className="mb-2">Memberships</label>

                {
                  // render after some time

                  <>
                    <DropdownServ
                      title={"Memberships"}
                      preSelected={membSelected}
                      updateSelectedArr={handleMembChange}
                    />
                  </>
                }
                <small className="form-text text-muted mt-2">
                  Note : Type & Press enter to add new Memberships
                </small>

                <div className="add-more"></div>
              </div>
            </div> 
            {/*<!-- /Memberships -->*/}

            {/*<!-- Registrations -->*/}
            {data.Registration && (
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Registration</h4>
                  <div className="education-info">
                    <div className="row form-row education-cont">
                      <div
                        div
                        className="flex flex-col lg:items-end  lg:flex-row  pb-2"
                      >
                        <div className="flex flex-wrap p-2">
                          <label className="mb-2">Number</label>
                          <input
                            name={"RegistrationNumber"}
                            type="text"
                            value={data.Registration.RegistrationNumber}
                            className="form-control"
                            onChange={(e) => {
                              setData({
                                ...data,
                                [Registration.RegistrationNumber]:
                                  e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="flex flex-wrap p-2">
                          <label className="mb-2">Year</label>
                          <input
                            name={"RegistrationYear"}
                            type="text"
                            value={data.Registration.RegistrationYear}
                            className="form-control"
                            onChange={(e) => {
                              setData({
                                ...data,
                                [Registration.RegistrationYear]: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*<!-- /Registrations -->*/}
            </>}
           

            <div className="submit-section submit-btn-bottom flex justify-end">
            <button
                
                // right-3 top-[15vh]  fixed
                className="btn btn-danger submit-btn  z-20 mb-10 mr-3"
                onClick={()=>{
                    router.back();
                   
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                // right-3 top-[15vh]  fixed
                className="btn btn-primary submit-btn  z-20 mb-10 mr-3"
                onClick={handleSubmit}
                
              >
                Create Account
              </button>
            </div>

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

export default AddDoc;
