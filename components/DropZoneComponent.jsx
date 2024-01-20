import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone"; 
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DropzoneComponent = ({ uploadFunc, updateFunc, limit,totalLimit, judgeArr }) => {
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

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  // const [uploadTotalLimit, setUploadTotalLimit] = useState();
  

  const onDrop = useCallback(
    (files) => {
      if (acceptedFiles.length < limit) {
        let newArr = [...acceptedFiles, ...files];

        if(newArr.length > limit){
          newArr.length = limit; // set length equal 5
          toast.error(`You can only upload ${totalLimit} images.`, emitterConfig);
        }

        setAcceptedFiles(newArr);

        updateFunc(newArr);
      }else{
        toast.error(`You can only upload ${totalLimit} images.`, emitterConfig);
      }
    },
    [acceptedFiles, limit, setAcceptedFiles, updateFunc]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const removeFile = (index) => {
    const newFiles = [...acceptedFiles];
    newFiles.splice(index, 1);
    setAcceptedFiles(newFiles);

    updateFunc(newFiles);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`mt-3  h-32 rounded-lg text-sm flex justify-center items-center my-2 mx-2 dropzone ${
          isDragActive ? "active" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <div className="flex flex-col items-center justify-center ">
            <button
              type="submit"
              className="btn bg-cyan-400 text-white submit-btn my-2 "
              // onClick={handleUpload}
            >
              Select Files
            </button>
            <p className="mx-3">Drag & drop here to add new images, or click to select.</p>
          </div>
        )}
      </div>

      {/* // preview area  */}
      {judgeArr.length > 0 && (
        <>
          {acceptedFiles.length > 0 && (
            <div className="mt-4 p-2 bg-gray-100 rounded-lg">
              <p className="m-2"> New Images :</p>
              {acceptedFiles.length > 0 && (
                <div className="flex flex-wrap">
                  {acceptedFiles.map((file, index) => (
                    <div
                      key={`${index}-xyz`}
                      className="relative h-[75px] w-[75px] mr-4 mb-4"
                    >
                      <Image
                        width={100}
                        height={100}
                        className=" h-[75px] w-[75px] rounded-lg"
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index}`}
                      />
                      <button
                        className=" absolute top-1 right-1 h-5 w-5 btn btn-icon btn-danger btn-sm"
                        onClick={() => {
                          removeFile(index);
                        }}
                      >
                        {" "}
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* // upload button  */}
      {acceptedFiles.length > 0 && (
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary submit-btn"
            onClick={()=>{uploadFunc()}}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default DropzoneComponent;
