import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  addSubCategory,
  deleteCategory,
  updateCategoryStore,
} from "../slices/categorySlice";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdAddCircle } from "react-icons/io";
// import GreenSwitch from "./GreenSwitch";
import Switch from "react-switch";
import axios from "axios";
import { useRouter } from "next/router";

const CategoryTree = () => {
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

  const router = useRouter();

  const data = useSelector((state) => state.category.data);

  const errorMsg = useSelector((state) => state.category.error);

  // tract changes made in error msg and show toast accordingly
  useEffect(() => {
    errorMsg !== null ? toast.error(errorMsg, emitterConfig) : null;
  }, [errorMsg]);

  // on load, get the categories and update redux state for same
  useEffect(() => {
    axios
    .get("/api/getCategory")
    .then(response=>{
      if(response.data.data.length === 0){
        dispatch(updateCategoryStore([]))
      }else{
        dispatch(updateCategoryStore(response.data.data[0].categoryData))
      }
    })
    .catch(error=>console.log(error.message))
  }, [])
  
  

  const dispatch = useDispatch();

  // for Edit mode
  const [editMode, setEditMode] = useState(false);

  // for new category
  const [newCategoryName, setNewCategoryName] = useState("");

  // for switch ----
  const [isChecked, setIsChecked] = useState(false);

  const handleCatChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleCatAdd = () => {
    if (newCategoryName != null && newCategoryName.length != 0) {
      dispatch(addCategory(newCategoryName));
    }
    // clear the input field
    setNewCategoryName('');
  };

  const handleSubCatAdd = (categoryId) => {
    if (newCategoryName != null && newCategoryName.length != 0) {
      dispatch(
        addSubCategory({ subCategoryName: newCategoryName, categoryId })
      );
    }
    // clear the input field
    setNewCategoryName('');
  };

  const handleSwitchChange = (checked) => {
    setIsChecked(checked);
    // toggle editMode
    setEditMode(checked);
    
    //if edit mode on scroll to lower section
    if(checked === true){
      window.scroll({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
    }
  };

  // for bottom buttons
  const handleDeleteAll = () => {
    // delete from database
    axios
      .delete("/api/deleteCategory")
      .then(()=>{
        // show toast
        toast("All Categories Deleted !")
      })
      .catch((error) => console.log(error.message));

    // and set redux state to []
    dispatch(updateCategoryStore([]));

    // close editmode
    handleSwitchChange(false);
  };

  const handleSave = () => {
    // make an saveChanges request
    axios
      .put("/api/saveCategoryChanges", { data })
      .then(()=>{
        // show toast 
        toast.success("Details Saved Successfully !")
      })
      .catch((error) => {
        console.log(error.message);
      });

    
    // close editmmode
    handleSwitchChange(false);
  };

  // MAIN FUNCTION => THAT SHOWS OUR CATEGORIES ON WEBPAGE
  const printCategoriesAndSubcategories = (categories, indent = 0) => {
    return categories.map((category, index) => (
      // increase index value (for top level category )
      <div key={category.id} className={`${indent === 0 ? "mt-3" : ""}`}>
        <span style={{ marginLeft: `${indent * 10}px` }}>
          {/* // minus button  */}
          <button
            disabled={!editMode ? true : false}
            className={`h-8 w-6 ml-2 ${
              !editMode ? " pointer-events-none" : ""
            }`}
            onClick={() => {
              dispatch(deleteCategory(category.id));
            }}
          >
            {/* // if edit mode show icon else show blank space  */}
            {/* also if indent = 0, show index number  */}
            <span className="mr-1">
            {editMode ? "🗑️" : (indent === 0)? <span className="text-lg font-bold">{index + 1}.</span> : "➤"}
            </span>
          </button>
          {/* // category name  */}
          <span className={`${indent === 0 ? " font-bold" : ""} text-lg`}>
            {category.name}
          </span>
          {/* // plus button  */}
          {editMode && (
            <IoMdAddCircle
              className="h-6 w-6 pb-1 inline ml-1 cursor-pointer"
              onClick={() => {
                handleSubCatAdd(category.id);
              }}
            />
          )}
        </span>
        {category.subCategories.length > 0 && (
          <div>
            {printCategoriesAndSubcategories(
              category.subCategories,
              indent + 3
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-[100vw]  ">
      {/* // ARRANGING THEM  */}

      {/* ------------TOP BAR --------------/ */}
      <div className="flex flex-col justify-between pt-6 ">
        {/* input and add category button s */}
        <div className="flex items-center mx-[3vw] rounded-t-xl bg-[#264D8A] shadow-sm shadow-black  ">
          <div className="flex h-[25vh] md:h-[19vh] justify-between  w-[100%]">
            <div className="flex ml-5 flex-col md:flex-row pb-3 ">
              {/* -------------- categories section  title  */}
              <div className="flex flex-col justify-center pl-3 pt-4 md:mt-0 md:mb-3 ">
                <h2 className="text-xl font-semibold mb-3  text-white mr-4">
                  {data.length != 0
                    ? "Modify Categories."
                    : "Create Categories."}
                </h2>
              </div>
              {/* ------------- input and below text  */}
              <div className="flex ml-2 md:ml-6 pt-2 items-center ">
                {editMode && (
                  <div className="flex flex-col  justify-center h-[100%]  ">
                    <input
                      className=" border-cyan-800 border-1 rounded-lg mr-3 px-2 h-9 w-[50vw] md:w-[22vw] mb-2"
                      type="text"
                      name="newCat"
                      id="newCat"
                      onChange={handleCatChange}
                      value={newCategoryName}
                      placeholder="Type name here"
                    />
                    <h2 className="text-sm  pb-2 text-gray-100 mr-5">
                      Write Category or Subcategory name to add it below
                    </h2>
                  </div>
                )}

                {/* // if null category nd not editmode  -------show add button*/}
                {!editMode && (
                  <button
                    className="shadow-lg shadow-black px-4 py-2 mx-3 h-10 text-[#264D8A] hover:bg-white bg-gray-200 rounded-lg mb-2"
                    onClick={() => {
                      handleSwitchChange(true);
                      
                    }}
                  >
                    {data.length === 0 ? "Start Creating" : "Update"}
                  </button>
                )}
              </div>
            </div>
            {/* -----------edit mode toggle */}
            <div className="flex flex-col items-center justify-center px-3 ">
              <h3 className="text-sm font-semibold mb-2 text-white mr-10">
                Edit mode 
              </h3>
              <Switch
                className="mt-1 mr-5 pl-5"
                onChange={handleSwitchChange}
                checked={isChecked}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------BOTTOM CONTENT --------------- */}
      <div>
        {/* // contents  */}
        <div className="mx-[2vw] h-[80vh] rounded-t-xl  border-1 shadow-lg shadow-black bg-gray-300 py-5 px-4 pt-3 mb-1">
          {/* // speciality heading -----  */}
          <div className="h-[8vh] flex pt-3  pb-5">
            <h2 className="text-lg  mb-3  text-gray-700 mr-4">
              Service Categories
            </h2>
            {/* ////// button to add new category  */}

            {editMode && (
              <button
                className={`${
                  !editMode ? "pointer-events-none" : ""
                } bg-[#264D8A] text-white border text-xs rounded-lg pb-1 ml-2 h-9 w-fit px-2 flex items-center `}
                onClick={handleCatAdd}
                disabled={!editMode ? true : false}
              >
                <div className=" font-semibold text-lg  ">+</div> 
                <div className="mt-1">&nbsp; New Category</div>
              </button>
            )}
          </div>
          {/* // speciality heading -----  close */}

          {/* ======= data actually printed from here !! =====  */}
          <div className={`bg-gray-200  pl-4 pb-5 h-[80%] bg-opacity-80 overflow-scroll mt-2 pt-2 rounded-lg ${(data.length === 0) ? "flex justify-center items-center" : null}`}>
            {(data.length === 0)? <h2 className="text-gray-500 font-extralight">Nothing to show here, go ahead and create the categories for your users to register with.</h2>:null}
            {printCategoriesAndSubcategories(data)}
          </div>

          {/* -----cancel and save--- buttons  */}
          <div className="flex justify-between items-center h-[12%] pt-4">
            {editMode && (
              <>
                <div>
                  <button
                    className="shadow-lg shadow-black px-4 py-2 mx-3 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    onClick={handleDeleteAll}
                  >
                    Delete All
                  </button>
                </div>
                <div className="mb-1">
                  <button
                    className="shadow-lg shadow-black px-4 py-2 mx-3 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
                    onClick={() => {
                      router.reload();
                    }}
                  >
                    Cancel
                  </button>
                  <button className="shadow-lg shadow-black px-4 py-2 mx-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                  onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
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
};

export default CategoryTree;
