
///// NOT IN USE YET

import React from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import Favicon from "../../components/Favicon";

function usrProfileStructure() {

  let empProfileStructure = useSelector((state) => state.profileStructure.EMP_PROFILE);
  let usrProfileStructure = useSelector((state) => state.profileStructure.USR_PROFILE);

  const saveChanges = () => {

    let reduxEmpSchema = empProfileStructure;
    let reduxUsrSchema = usrProfileStructure;

    let dbUsrSchema = {};

    // get all fields from db
    axios
      .get("/api/getPStructure")
      .then((response) => {
        let data = response.data;
        // update dbUsrSchema
        dbUsrSchema = data.USR_PROFILE;
      })
      .catch((error) => {
        console.log(error.message);
      });

    ////REMOVE FIELDS NOWWW
    // COMPARE and remove fields
    const getArrayFromObj = (obj) => {
      let arr = [];
      Object.keys(obj).map((key) => {  // function to get obj key's  array
        arr.push(key);
      });
      return arr;
    };

    const dbUsrArr = getArrayFromObj(dbUsrSchema);
    const reduxUsrArr = getArrayFromObj(reduxUsrSchema);

// ------------- SEE FOR ADDED/ REMOVED FIELDS HERE ---------------

    let removedUsrFields = [];
    dbUsrArr.map((key) => {
      if (!reduxUsrArr.includes(key)) {
        // for usr
        removedUsrFields.push(key);
      }
    });

    // now creating req-body
    const createReqObj = (arr) => {
      let obj = {};
      arr.map((item) => {
        obj[item] = "";
      });
      return obj;
    };

    const usrReqObj = createReqObj(removedUsrFields);
     // removing for usr....if some fields are removed 
     if(removedUsrFields.length > 0){
        axios.put("api/unsetUSR", usrReqObj)
        .then((response) => {
          console.log("Some fields removed from usr records !", response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }


    ///----Now Finally Update the entire Profile Schema in db-----
    const finalSchema = {
        EMP_PROFILE: reduxEmpSchema,
        USR_PROFILE: reduxUsrSchema,
      };
    
      // updatingggg
    axios
      .put("/api/savePStructure", finalSchema)
      .then((response) => {
        console.log("Final Update of Profile Schema Successful", response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

  };

  return (
    <div className='flex flex-col p-5'>

      // webiste favicon
      <Favicon/>
      
      <div>usrProfileStructure</div>
      <button
        className="rounded-xl bg-red-400 text-white h-10 w-40"
        onClick={saveChanges}
      >
        Save changes
      </button>
    </div>
  );
}

export default usrProfileStructure;
