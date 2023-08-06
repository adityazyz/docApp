import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // if the element have title ..use it and search for child fields in "fileds" array
  // you will get fields Name(s) and type(s) in struct elements of the array
  // or ----- if title field is null, you can directly access 1 field name and type
  EMP_PROFILE: [
    //PersonalDetails  (-EMP-) ----- [element at index = 0 ]
    {
      title: "PersonalDetails",
      fields: [
        {
          fieldName: "UserId",
          fieldType: "text",
        },
        {
          fieldName: "UserName",
          fieldType: "text",
        },
        {
          fieldName: "ProfilePicture",
          fieldType: "text",
        },
        {
          fieldName: "FirstName",
          fieldType: "text",
        },
        {
          fieldName: "LastName",
          fieldType: "text",
        },
        {
          fieldName: "DateOfBirth",
          fieldType: "date",
        },
        {
          fieldName: "Email",
          fieldType: "email",
        },
        {
          fieldName: "Mobile",
          fieldType: "text",
        },
        {
          fieldName: "Gender",
          fieldType: "text",
        },
        {
          fieldName: "Biography",
          fieldType: "text",
        },
      ],
    },
    // Address (-EMP-) ----- [element at index = 1 ]
    {
      title: "Address",
      fields: [
        {
          fieldName: "Address",
          fieldType: "text",
        },
        {
          fieldName: "City",
          fieldType: "text",
        },
        {
          fieldName: "State",
          fieldType: "text",
        },
        {
          fieldName: "ZipCode",
          fieldType: "text",
        },
        {
          fieldName: "Country",
          fieldType: "text",
        },
      ],
    },
    // Pricing (-EMP-) ----- [element at index = 2 ]
    {
      title: null,
      fieldName: "Pricing",
      fieldType: "number",
    },

    // Service (-EMP-) ----- [element at index = 3 ]
    {
      title: "Service",
      fields: [
        {
          fieldName: "Specializations",
          fieldType: "text", // comma seperated text
        },
        {
          fieldName: "Services",
          fieldType: "text", // comma Separated text
        },
      ],
    },
    // Education (-EMP-) ----- [element at index = 4 ]
    {
      title: "Education",
      fields: [
        {
          fieldName: "Degree",
          fieldType: "text",
        },
        {
          fieldName: "College",
          fieldType: "text",
        },
        {
          fieldName: "YearOfCompletion",
          fieldType: "text",
        },
      ],
    },
    // Experience (-EMP-) ----- [element at index = 5 ]
    {
      title: "Experience",
      fields: [
        {
          fieldName: "Place",
          fieldType: "text",
        },
        {
          fieldName: "From",
          fieldType: "date",
        },
        {
          fieldName: "Till",
          fieldType: "date",
        },
        {
          fieldName: "Designation",
          fieldType: "text",
        },
      ],
    },
    // Workplace info (-EMP-) ----- [element at index = 6 ]
    {
      title: "WorkPlaceInfo",
      fields: [
        {
          fieldName: "Name",
          fieldType: "text",
        },
        {
          fieldName: "Address",
          fieldType: "text",
        },
        {
          fieldName: "Images",
          fieldType: "text", // comma seperated text , ( text url)
        },
      ],
    },
    // Award (-EMP-) ----- [element at index = 7 ]
    {
      title: "Award",
      fields: [
        {
          fieldName: "Name",
          fieldType: "text",
        },
        {
          fieldName: "Year",
          fieldType: "text",
        },
      ],
    },
    // Memberships (-EMP-) ----- [element at index = 8 ]
    {
      title: null,
      fieldName: "Memberships",
      fieldType: "text",
    },
    // Password (-EMP-) ----- [element at index = 9 ]
    {
      title: null,
      fieldName: "Password",
      fieldType: "password",
    },
    // Extra (-EMP-) ----- [element at index = 10 ]
    {
      title: "Extra",
      fields: [],
    },
  ],


  USR_PROFILE: [
    // Personal Details (-USR-) ---- [element at index = 0 ]
    {
      title: "PersonalDetails",
      fields: [
        {
          fieldName: "UserId",
          fieldType: "text",
        },
        {
          fieldName: "UserName",
          fieldType: "text",
        },
        {
          fieldName: "ProfilePicture",
          fieldType: "text",
        },
        {
          fieldName: "FirstName",
          fieldType: "text",
        },
        {
          fieldName: "LastName",
          fieldType: "text",
        },
        {
          fieldName: "DateOfBirth",
          fieldType: "date",
        },
        {
          fieldName: "Email",
          fieldType: "email",
        },
        {
          fieldName: "Mobile",
          fieldType: "text",
        }
      ],
    },

    // Address (-USR-) ---- [element at index = 1 ]
    {
      title: "Address",
      fields: [
        {
          fieldName: "Address",
          fieldType: "text",
        },
        {
          fieldName: "City",
          fieldType: "text",
        },
        {
          fieldName: "State",
          fieldType: "text",
        },
        {
          fieldName: "ZipCode",
          fieldType: "text",
        },
        {
          fieldName: "Country",
          fieldType: "text",
        },
      ],
    },
    // Password (-USR-) ---- [element at index = 2 ]
    {
      title: null,
      fieldName: "Password",
      fieldType: "password",
    },
    // Extra (-USR-) ----- [element at index = 3 ]
    {
      title: "Extra",
      fields: [],
    },
  ]
};

export const profileStructureSlice = createSlice({
  name: "profileStructure",
  initialState,
  reducers: {
    // functions below only changes "fields" property of struct with title -> "Extra" 
    // fields takes an array -> of further fields in the 2 possible structures below :
    // (1) -> { title : null , fieldName , fieldType} ...or
    // (2) -> { title : "", fields : [ {fieldName, fieldType}, {}...]  }
    updateEmpProfileExtraFields: (state, action) => {
      state.EMP_PROFILE[10].fields = action.payload ;  // payload should be an array
    },
    updateUsrProfileExtraFields: (state, action) => {
      state.USR_PROFILE[3].fields = action.payload;    // payload should be an array
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateEmpProfileExtraFields, updateUsrProfileExtraFields } =
  profileStructureSlice.actions;

export default profileStructureSlice.reducer;
