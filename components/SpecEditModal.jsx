import React, { useState } from "react";
import adminCss from "../src/styles/admin.module.css";
import supabase from "../middleware/supabaseConfig";
import axios from "axios";
import { useLockBodyScroll } from "@uidotdev/usehooks";
 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function SpecEditModal({ id, close, name, url, toggle }) {
  useLockBodyScroll(); // lock scroll

  console.log(id);
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

  const oldName = name;
  const [specName, setSpecName] = useState(name);

  const [fileSelected, setFileSelected] = useState();

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

      let newFileName = `${name}-${Date.now()}-${extension}`;
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
        console.log("new file saved to cloud");
        return fileUrl;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteFromCloud = async (path) => {
    try {
      await supabase.storage.from(BUCKET).remove([path]);
      console.log("old file deleted from cloud");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handlePhotoChange = (e) => {
    setFileSelected(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let changeMade = false;
    // if image changed
    // delete from cloud ..and upload another ..and update url
    //set changemade = true;
    let imageUrlLocal = "";
    if (fileSelected) {
      // if file selected, it means it will take time....so show a toast
      toast("Updating...", emitterConfig);
      
      // extract path from old-url
      let arr = url.split("/");
      let path = arr[arr.length - 1];

      await deleteFromCloud(path); // delete from supabase
      imageUrlLocal = await saveToCloud(fileSelected); // saving new image

      // now update the image
      let reqObj = {
        id,
        data: { image: imageUrlLocal },
      };
      // making req
      await axios
        .put("/api/specUpdate", reqObj)
        .then((response) => {
          if (response.data.success === true) {
            changeMade = true;
            toast.success("Speciality updated.", emitterConfig);
            setTimeout(() => {
              toggle();
              close();
            }, 1800);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    // if name changed .
    if (specName != oldName) {
      // now update the image
      let reqObj = {
        id,
        data: { name: specName },
      };
      // making req
      await axios
        .put("/api/specUpdate", reqObj)
        .then((response) => {
          if (response.data.success === true) {
            if(changeMade === false){
              toast.success("Speciality updated.", emitterConfig);
            }
            setTimeout(() => {
              toggle();
              close();
            }, 1800);

          }else if(response.data.success === false) {
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
      {/* <!-- Edit Details Modal --> */}
      <div className="fixed top-0 left-0 z-50 w-[100vw] h-[100vh] bg-black bg-opacity-40">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Specialities</h5>
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
                        onChange={handlePhotoChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-full"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Edit Details Modal --> */}

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

export default SpecEditModal;
