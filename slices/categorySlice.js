import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data : [],
  error : null
};


export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      // set error to empty
      state.error = null;

      // generate random id
      let x = Math.floor(Math.random() * 100);
      let token = `${x}` + Date.now();

      let newCategory = {
        id: parseInt(token),
        name: action.payload,
        subCategories: [],
      };

      // check for same category
      let duplicate = false;
      state.data.map((element)=>{
        if(element.name === newCategory.name){
          duplicate = true;
        }
      })
      // adding 
      if(!duplicate){
        state.data.push(newCategory);
      }else{
        state.error = "New Category Should be unique !"
      }

      
    },
    addSubCategory: (state, action) => {
      // set error to empty
      state.error = null;

      // generate random id
      let x = Math.floor(Math.random() * 100);
      let token = `${x}` + Date.now();

      let newSubCategory = {
        id: parseInt(token),
        name: action.payload.subCategoryName,
        subCategories: [],
      };

    // pass the duplicate array in recursive function and modify it
      let dataPassed = state.data;

      const addSubCategoriesById = (data,subCategoryToAdd, categoryId) => {
        
        for (let category of data) {
          if (category.id === categoryId) {
            
            // search if the particular sub category already exists !!!!!!!!!
            let duplicateCategory = false;
            category.subCategories.map((element)=>{
              if(element.name === subCategoryToAdd.name){
                duplicateCategory = true;
              }
            })
            
            if(!duplicateCategory){   // add sub category
              category.subCategories.push(subCategoryToAdd);
            }else{ 
              // if duplicate category (show toast)
              state.error = "New Category Should be unique !"
            }
            return true;

          } else if (category.subCategories.length > 0) {
            const subCategoryAdded = addSubCategoriesById(
              category.subCategories,
              subCategoryToAdd,
              categoryId 
            );
            if (subCategoryAdded) {
              return true;
            }
          }
        }
        return false;
      };

      // call the subCategory adding function
      addSubCategoriesById(dataPassed, newSubCategory, action.payload.categoryId)

      state.data = dataPassed;
    },

    deleteCategory : (state, action)=>{

        // dupliacte array to modify
        let dataPassed = state.data;

        function deleteCategoryById(data, categoryId) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === categoryId) {
                    data.splice(i, 1);
                    return true;
                } else if (data[i].subCategories.length > 0) {
                    const subCategoryDeleted = deleteCategoryById(data[i].subCategories, categoryId);
                    if (subCategoryDeleted) {
                        return true;
                    }
                }
            }
            return false;
        };

        // caling the recursive function deleting the 
        deleteCategoryById(dataPassed, action.payload)

        // set state data to updated array
        state.data = dataPassed;

    },

    updateCategoryStore : (state,action)=>{
      state.data = action.payload
    }
  },

});

// Action creators are generated for each case reducer function
export const { addCategory, addSubCategory, deleteCategory, updateCategoryStore } = categorySlice.actions;

export default categorySlice.reducer;
 