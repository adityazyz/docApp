import React, { useState } from "react";
import adminCss from "../src/styles/admin.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLockBodyScroll } from "@uidotdev/usehooks";

import supabase from "../middleware/supabaseConfig";
import axios from "axios";

function SpecAddModal({ close , toggle}) {
  useLockBodyScroll(); // SCROLL LOCK

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

  const BUCKET = "specialities";

  const [specName, setSpecName] = useState("");
  const [specImage, setSpecImage] = useState();

  const saveToCloud = async (file) => {
    // function to get public url
    async function getPublicURL(filePath) {
      const publicURL = supabase.storage.from(BUCKET).getPublicUrl(filePath);
      return publicURL;
    }

    // upload img >>>>>>>>>>>>>>>>>>
    try {
      let arr = file.name.split(".");
      let extension = arr[arr.length - 1]; // extracting file extention

      let newFileName = `${"spec"}-${Date.now()}.${extension}`;
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
        setSpecImage(fileUrl);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteFromCloud = async (path) => {
    try {
      await supabase.storage.from(BUCKET).remove([path]);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const handleFileChange = (e) => {
    // if file changed for second time 
    // delete from supabase 
    if(specImage){
      // extract path from old-url
      let arr = specImage.split("/");
      let path = arr[arr.length - 1];

      deleteFromCloud(path);
    }
    
      saveToCloud(e.target.files[0]);
     // upload to cloud and get url
  };


  const handleSubmit =(e) => {
    e.preventDefault();

    // now adding to db
    if (specName.length > 0 && specImage) {
      //make post request

      let reqObj = {
        name: specName,
        image: specImage,
      };
      
     axios
        .post("/api/specAdd", reqObj)
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.message, emitterConfig);
            setTimeout(() => {
              // rerender data
              toggle();
              
              close(); // close modal
            }, 1800);
          } else if (response.data.success === false) {
            toast.error(response.data.message, emitterConfig);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    

  };

  return (
    <>
      {/* <!-- Add Modal --> */}
      <div className="fixed top-0 left-0 z-50 w-[100vw] h-[100vh] bg-black bg-opacity-40">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Specialities</h5>
              <button type="button" className="close" onClick={close}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row form-row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">Specialities</label>
                      <input
                        type="text"
                        className={`${adminCss.formControl}`}
                        value={specName}
                        onChange={(e) => {
                          setSpecName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group">
                      <label className="mb-2">Image</label>
                      <input
                        type="file"
                        className={`${adminCss.formControl} text-sm  `}
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-full"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /ADD Modal --> */}

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

export default SpecAddModal;
