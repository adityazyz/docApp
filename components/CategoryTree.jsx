import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, addSubCategory, deleteCategory } from "../slices/categorySlice";

const CategoryTree = () => {
  const data = useSelector((state) => state.category.data);

  const dispatch = useDispatch();

  // for new category
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCatChange = (e)=>{
    setNewCategoryName(e.target.value)
  }

  const handleCatAdd = ()=>{
    if(newCategoryName != null && newCategoryName.length != 0){
      dispatch(addCategory(newCategoryName));
    }
  }

  const handleSubCatAdd = (categoryId)=>{
    if(newCategoryName != null && newCategoryName.length != 0){
      dispatch(addSubCategory({subCategoryName : newCategoryName, categoryId} ));
      console.log(data)
    }
  }

  // MAIN FUNCTION => THAT SHOWS OUR CATEGORIES ON WEBPAGE
  const printCategoriesAndSubcategories = (categories, indent = 0) => {
    return categories.map((category) => (
      <div key={category.id}>
        <span style={{ marginLeft: `${indent * 10}px` }}>
          {/* // minus button  */}
          <button 
          className="bg-blue-300 border rounded-lg h-8 w-6 ml-2"
          onClick={()=>{dispatch(deleteCategory(category.id))}}
          >-</button>
          {/* // category name  */}
          {category.name}
          {/* // plus button  */}
          <button 
          onClick={()=>{handleSubCatAdd(category.id)}} 
          className="bg-blue-300 border rounded-lg h-8 w-6 ml-2">
            +
          </button>
        </span>
        {category.subCategories.length > 0 && (
          <div>
            {printCategoriesAndSubcategories(
              category.subCategories,
              indent + 2
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <input className=" border-cyan-200 border-2 rounded-lg mr-3 px-2" type="text" name="newCat" id="newCat" onChange={handleCatChange} defaultValue={newCategoryName}/>
      <button
        className="bg-blue-300 border rounded-lg  px-3 py-1"
        onClick={handleCatAdd}
      >
        Add New Category
      </button>
      {printCategoriesAndSubcategories(data)}
    </div>
  );
};

export default CategoryTree;
