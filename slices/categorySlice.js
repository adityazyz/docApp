import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 1,
      name: "Cat 1",
      subCategories: [
        {
          id: 11,
          name: "Sub 1-1",
          subCategories: [],
        },
        {
          id: 12,
          name: "Sub 1-2",
          subCategories: [],
        },
      ],
    },
    {
      id: 2,
      name: "Cat 2",
      subCategories: [
        {
          id: 21,
          name: "Sub 2-1",
          subCategories: [
            {
              id: 211,
              name: "Sub 2-1-1",
              subCategories: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Cat 3",
      subCategories: [],
    },
  ],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      // generate random id
      let x = Math.floor(Math.random() * 100);
      let token = `${x}` + Date.now();

      let newCategory = {
        id: parseInt(token),
        name: action.payload,
        subCategories: [],
      };

      // adding
      state.data.push(newCategory);
    },
    addSubCategory: (state, action) => {
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
            category.subCategories.push(subCategoryToAdd);
            console.log(data)
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

    }
  },
});

// Action creators are generated for each case reducer function
export const { addCategory, addSubCategory, deleteCategory } = categorySlice.actions;

export default categorySlice.reducer;
