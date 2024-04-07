import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeAdminPFP } from "../slices/adminPFPSlice";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import axios from "axios"; 
import adminCss from "../src/styles/admin.module.css"
import supabase from "../middleware/supabaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

// let xx = new Date(x) -- string to date
// let yy = xx.toISOString().slice(0,10); --  date to string

function AdminModal() {

  const router = useRouter();

  const data = JSON.parse(router.query.data);

  const dispatch = useDispatch();

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

  const [detectChange, setDetectChange] = useState(false);

  const websiteColorDark = useSelector(
    (state) => state.website.websiteColorDark
  );
  const darkBgTheme = {
    backgroundColor: websiteColorDark,
    borderColor: websiteColorDark,
  };

  const [name, setName] = useState(data.Name);
  const [dateOfBirth, setDateOfBirth] = useState(data.DateOfBirth);
  const email = data.Email;
  const [mobile, setMobile] = useState(data.Mobile);

  const [address, setAddress] = useState(data.Address.Address);
  const [city, setCity] = useState(data.Address.City);
  const [state, setState] = useState(data.Address.State);
  const [zipCode, setZipCode] = useState(data.Address.ZipCode);
  const [country, setCountry] = useState(data.Address.Country);

  const [profilePicture, setProfilePicture] = useState(data.ProfilePicture);

  const BUCKET = "admin-profile-picture";

  const saveToCloud = async(file)=>{
    // function to get public url
    async function getPublicURL(filePath) {
      const publicURL = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);
      return publicURL;
    }

    // upload img >>>>>>>>>>>>>>>>>>
    try {
      let arr = file.name.split(".");
      let extension = arr[(arr.length - 1)]; // extracting file extention

      let newFileName = `${Date.now()}-${extension}`;
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
        setProfilePicture(fileUrl);

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

  const handleProfilePictureChange = (e) => {

    // change detected
    setDetectChange(true); 

    let file = e.target.files[0];
    
    let oldUrl = profilePicture;
    if(oldUrl === ""){
      // directly save new photo to supabase..and save url at db
      saveToCloud(file);

    }else{
      // extract path from old-url
      let arr = profilePicture.split("/");
      let path = arr[arr.length - 1];  
      
      //delete old photo from supabase
      deleteFromCloud(path)

      // save new photo to supabase
      saveToCloud(file);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const myObj = {
      Name: name,
      ProfilePicture : profilePicture,
      DateOfBirth: dateOfBirth,
      Email: email,
      Mobile: mobile,
      Address: {
        Address: address,
        City: city,
        State: state,
        ZipCode: zipCode,
        Country: country,
      },
    };

    if (detectChange === true) {
      axios
        .put("/api/updateAdmin", myObj)
        .then(() => {
          toast.success("Details updated Successfully !", emitterConfig);
          setTimeout(() => {
            // update image in redux store
            dispatch(changeAdminPFP(profilePicture))

          }, 2000);
          setTimeout(() => {
            router.push("/admin/profile");
          }, 2200);
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  };

  return (
    <div className="container-fluid mt-4">
    <div className="card frame overflow-visible">
      <div className="card-body">
            
              <h1 className="card-title">Personal Details</h1>
            <>
              <form> 
                <div className="row form-row">
                  {/* // profile picture  */}
                <div className="col-12">
                    <div className="form-group">
                      <label className="mb-2">Profile Picture</label>
                      <input
                        type="file"
                        className={adminCss.formControl}
                        onChange={handleProfilePictureChange}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setDetectChange(true);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">Date of Birth</label>

                      <input
                        type="date"
                        className="form-control"
                        value={dateOfBirth}
                        onChange={(e) => {
                          setDateOfBirth(e.target.value);
                          setDetectChange(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">Email ID</label>
                      <input
                        type="email"
                        className="form-control pointer-events-none"
                        value={email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          setDetectChange(true);
                        }}
                      />
                    </div>
                  </div>
                  <hr
                    className="mt-3 mb-4 text-gray-500 mx-3 "
                    style={{ width: "450px" }}
                  />
                  <div className="col-12">
                    <h5 className="form-title text-lg mb-3">
                      <span>Address</span>
                    </h5>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="mb-2">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setDetectChange(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setDetectChange(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">State</label>
                      <input
                        type="text"
                        className="form-control"
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value);
                          setDetectChange(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={zipCode}
                        onChange={(e) => {
                          setZipCode(e.target.value);
                          setDetectChange(true);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setDetectChange(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end mt-5">
                <button
                  type="submit"
                  className="btn btn-danger btn-block my-2 w-fit mx-2"
                  onClick={()=>{
                    router.push("/admin/profile");
                  }}
                  
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-block my-2 w-fit mx-2"
                  onClick={handleSubmit}
                  style={darkBgTheme}
                >
                  Save Changes
                </button>
                </div>
              </form>
            </>
         
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
    </div>
    </div>
  );
}

export default AdminModal;
