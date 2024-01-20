import React, { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmpProfileExtraFields,
  updateUsrProfileExtraFields,
} from "../slices/profileStructureSlice";
import { useLockBodyScroll } from "@uidotdev/usehooks";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addfield(props) {

  const websiteColor = useSelector((state)=>state.website.websiteColor) 

  const colorList = {
    Blue : "bg-[#14558D]",
    Green : "bg-[#16a332]",
    Red : "bg-[#C61E1D]",
    Purple : "bg-[#9466E0]",
    Gray : "bg-[#444444]",
    Pink : "bg-[#ea2487]",
    Orange : "bg-[#F15F01]"
  } ; // make a copy of redux color obj and use it
 
  // function to set bg color 
    const useBackgroungColor = ()=> {
      switch (websiteColor) {
        case "Blue":
          return colorList.Blue
        case "Green" :
          return colorList.Green;
        case "Red" :
          return colorList.Red;
        case "Purple" : 
          return colorList.Purple;
        case "Gray" :
          return colorList.Gray;
        case "Pink":
          return colorList.Pink;
        case "Orange":
          return colorList.Orange;
        default:
          return colorList.Red;
      }
    }

  const emitterConfig = {
    position: "bottom-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  // functions taken from props > close ...AND ForProfile

  useLockBodyScroll(); // now lock the scroll

  const dispatch = useDispatch();

  const dataTypes = ["text", "number", "date", "email", "password"];
  const [headingNeeded, setHeadingNeeded] = useState(null);
  const [multipleNeeded, setMultipleNeeded] = useState(null);
  const [myHeading, setMyHeading] = useState("");

  const [records, setRecords] = useState([
    { fieldName: "", fieldType: "" }, // Initial record
  ]);


  const emp_fields = useSelector((state) => state.profileStructure.EMP_PROFILE[10].fields);

  const usr_fields = useSelector((state) => state.profileStructure.USR_PROFILE[3].fields);


  const accessExtraFields = (ForProfile) => {
    if (ForProfile === "EMP") {
      return emp_fields;
    } else if (ForProfile === "USR") {
      return usr_fields;
    }
  };

  const handleTitleChange = (event) => {
    setHeadingNeeded(event.target.value);
  };

  const handleMultipleChange = (event) => {
    setMultipleNeeded(event.target.value);
  };

  const addRecord = () => {
    setRecords([...records, { fieldName: "", fieldType: "" }]);
  };

  const deleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRecords = [...records];
    updatedRecords[index][field] = value;
    setRecords(updatedRecords);
  };

  const handleHeadingChange = (e) => {
    setMyHeading(e.target.value);
  };

  const validateRecords = () => {
    let itemsNull = false;
    records.map((item) => {
      if (item.fieldType.length === 0 || item.fieldName.length === 0) {
        itemsNull = true; // if any of the field empty return false
      }
    });
    // also check if heading filled 
    if(headingNeeded === true){
      if(myHeading.length === 0){
        itemsNull = true; // return false
      }
    }
    // also check for multiple and heading needed 
    if(headingNeeded === null || multipleNeeded === null){
      itemsNull = true; // return false
    }

    return !itemsNull; // else return true
  };

  const handleSave = () => {
    if (validateRecords()) {
      let random = Math.floor(Math.random() * 100);
      let newId = `${random}` + Date.now();
      let myStruct;

      if (headingNeeded && headingNeeded === "yes") {
        myStruct = {
          id: newId,
          heading: myHeading,
          fields: records,
        };
      } else {
        myStruct = {
          id: newId,
          heading: null,
          fieldName: records[0].fieldName,
          fieldType: records[0].fieldType,
        };
      }

      // now use the struct to update in redux and db  !
      // use props.ForProfile to deicde
      // props.ForProfile = EMP/USR
      // state.EMP_PROFILE[10].fields
      // state.USR_PROFILE[3].fields

      // Faccess extra fields ..make copy of it, append the new record struct and
      // and update the redux fields or db fields ....

      let extraFieldArray = accessExtraFields(props.ForProfile);
      
      extraFieldArray = [...extraFieldArray,myStruct]

      // doing it for redux
      if (props.ForProfile === "EMP") {
        dispatch(updateEmpProfileExtraFields(extraFieldArray));
      } else if (props.ForProfile === "USR") {
        dispatch(updateUsrProfileExtraFields(extraFieldArray));
      }

      // close the popup
      toast.success("Field Added Successfully!")
      props.close();
    }else{
      toast.error("Please fill all fields !",emitterConfig);
    }
  };

  return (
    // the black bg
    <div className="h-[100%] w-[100vw] flex z-50 fixed bottom-0 left-0 overflow-hidden justify-center items-center bg-black  bg-opacity-70 ">
      {/* // close bitton  */}
      <button
        className=" absolute right-[2vw] top-[4vh] m-1"
        onClick={props.close}
      >
        <span className="text-xl font-thin text-white">X</span>
      </button>
      {/* // the white box  */}
      <div className="h-[80vh] w-[85vw] md:w-[80vw] lg:w-[70vw] bg-white rounded-lg pt-4 px-4">
        {/* // display area in white box  */}
        <div className="h-[90%] ">
          <div className="w-[100%] flex justify-center items-center text-gray-600 mb-4">
            <h1 className="text-lg font-semibold"> ADD FIELD</h1>
          </div>

          {/* // heading question ....  */}
          <div className="flex">
            <h2 className="text-lg  mb-4">
              1) Does your fields fall under a heading or category ?
            </h2>
            {/* // yes and no  */}
            <div className="ml-3">
              <label className="ml-4 ">
                <input
                  className="h-4 w-4"
                  type="radio"
                  value="yes"
                  checked={headingNeeded === "yes" ? true : false}
                  onChange={handleTitleChange}
                />
                <span className="text-lg  ml-2">Yes</span>
              </label>
              <label className="ml-4">
                <input
                  className="h-4 w-4"
                  type="radio"
                  value="no"
                  checked={headingNeeded === "no" ? true : false}
                  onChange={handleTitleChange}
                />
                <span className="text-lg  ml-2">No</span>
              </label>
            </div>
          </div>

          {/* // multiple records question  */}
          <div className="flex ">
            <h2 className="text-lg  mb-4">
              2) Do you need to collect multiple entries under same fieldName ?
            </h2>
            {/* // yes and no  */}
            <div className="ml-3">
              <label className="ml-4 mr-4 ">
                <input
                  className="h-4 w-4"
                  type="radio"
                  value="yes"
                  checked={multipleNeeded === "yes" ? true : false}
                  onChange={handleMultipleChange}
                />
                <span className="text-lg  ml-2">Yes</span>
              </label>
              <label className="ml-1">
                <input
                  className="h-4 w-4"
                  type="radio"
                  value="no"
                  checked={multipleNeeded === "no" ? true : false}
                  onChange={handleMultipleChange}
                />
                <span className="text-lg  ml-2">No</span>
              </label>
            </div>
          </div>

          {/* // fields and fieldType  container  */}
          <div className=" overflow-scroll h-[60%] border-gray-400 border-dashed border-2 rounded-lg ">
            <div>
              {/* // heading  */}
              {headingNeeded && headingNeeded === "yes" && (
                <div className="pb-2 mb-1 pl-4 pt-2 bg-gray-100">
                  <label htmlFor="heading" className="text-lg">
                    Heading :{" "}
                  </label>
                  <input
                    name="heading"
                    type="text"
                    value={myHeading}
                    onChange={handleHeadingChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ml-4 text-lg"
                  />
                </div>
              )}
              {records.map((record, index) => (
                <div
                  key={index}
                  className="mb-1 flex px-3 rounded-lg pb-2 lg:pb-0 bg-gray-100 items-start lg:items-center justify-between "
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center">
                    {/* // fieldName  */}
                    <div className="flex justify-center items-center my-2">
                      <label htmlFor="fieldName" className="text-lg">
                        Field Name :
                      </label>
                      <input
                        name="fieldName"
                        type="text"
                        value={record["fieldName"]}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ml-4 text-lg mr-3"
                        onChange={(e) =>
                          handleInputChange(index, "fieldName", e.target.value)
                        }
                      />
                    </div>
                    {/* // field fieldType  */}
                    <div className="flex justify-center items-center pt-2 lg:pt-0">
                      <label htmlFor="fieldType" className="text-lg">
                        DataType :
                      </label>
                      {/* // Our dropdown menu  */}
                      <select
                        className="mr-3 ml-2 text-lg py-1 px-2 rounded-lg outline-dashed outline-gray-400 bg-white "
                        onChange={(e) => {
                          handleInputChange(index, "fieldType", e.target.value); // add selected item
                        }}
                      >
                        <option value={""}>Select</option>
                        {dataTypes.map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  {/* // delete button  */}
                  {index > 0 && (
                    <div
                      className="bg-red-500 hover:bg-red-600 rounded-lg p-1 px-2 mt-4 pt-2  inline lg:mt-1 ml-3 cursor-pointer"
                      onClick={() => deleteRecord(index)}
                    >
                      <button>
                        <MdOutlineDeleteForever className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* // add button  */}
            {headingNeeded && headingNeeded === "yes" && (
              <div
                className="text-blue-600 mb-4 my-2 ml-2 "
                onClick={addRecord}
              >
                <i className="fa fa-plus-circle"></i> Add More
              </div>
            )}
          </div>
        </div>
        {/* // the button area  */}
        <div className="h-[10%] rounded-lg flex justify-end items-start">
          <div>
            {/* // cancel button  */}
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-sm transition duration-300 ease-in-out mx-3"
              onClick={props.close}
            >
              Cancel
            </button>
            {/* // add field button  */}
            <button
              className= {`${useBackgroungColor()} opacity-80 hover:opacity-100 text-white px-4 py-2 rounded-sm transition duration-300 ease-in-out mx-2`}
              onClick={handleSave}
            >
              Add Field
            </button>
          </div>
        </div>
      </div>
      {/* // TOAST CONTAINER  */}
      <div>
        <ToastContainer
          position="bottom-center"
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

export default Addfield;
