import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import supabase from "../middleware/supabaseConfig";

function SpecDeleteModal({ name,url, close, toggle }) {

  const BUCKET = "specialities";

  const deleteFromCloud = async (path) => {
    try {
      await supabase.storage.from(BUCKET).remove([path]);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

    useLockBodyScroll() // LOCK SCROLL

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

  const handleDelete = (e) => {
    e.preventDefault();

    // delete photo from cloud
    // extract path from old-url
    let arr = url.split("/");
    let path = arr[arr.length - 1];
    deleteFromCloud(path);
    
    axios.delete("/api/specDelete", {name})
    .then((response)=>{
        if(response.data.success === true){
            // show toast after delete and close modal
            toast.success(response.data.message, emitterConfig) ; 
            setTimeout(() => {
              // rerender data
              toggle();

              close(); // now close modal
            }, 1800);
        }
    })
    .catch((error)=>{
        console.log(error.message);
    })
  };
  return (
    <>
      {/* <!-- Delete Modal --> */}
      <div
        className="fixed top-0 left-0 bg-black h-[100vh] w-[100vw] bg-opacity-40 z-50"
        id="delete_modal"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-content p-2">
                <h4 className="modal-title mb-2">Delete</h4>
                <p className="mb-4">Are you sure want to delete?</p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn bg-gray-500 hover:bg-gray-600 text-white  "
                    onClick={close}
                  >
                    Cancel{" "}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ml-8"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Delete Modal --> */}

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

export default SpecDeleteModal;
