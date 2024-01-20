import React, { useEffect, useState } from 'react'
import PtDataTable from '../../../components/PtDataTable';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function Patients() {
  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState();
  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)

  useEffect(() => {
    const fieldOrder = ["Email","Name","Age", "BloodGroup", "Mobile", "LastVisit", "Paid", "ProfilePicture"]

    // func to filter data
    const filterObjectsByFields =(objects, fields)=> {
      return objects.map(object => {

        const filteredObject = {};
        fields.forEach(field => {
          if (object.hasOwnProperty(field)) {
            filteredObject[field] = object[field];
            // setting field mobile
            filteredObject["Mobile"] = object.Mobile.Number

            //setting age (using current year and dob year)
            let dobYear = object.DateOfBirth ? parseInt(object.DateOfBirth.split("-")[0]) : -1;
            let currentYear = new Date().getFullYear();
            let age = currentYear - dobYear;
            if(dobYear != -1){
              filteredObject["Age"] = `${age} ${age > 1 ? "yrs" : "yr" }`;
              if((currentYear - dobYear) === 0){
                let dobMonth = parseInt(object.DateOfBirth.split("-")[1]);
                let currentMonth = new Date().getMonth();
                age = currentMonth - dobMonth
                if (age > 0){
                  filteredObject["Age"] = `${age} ${(age)>1 ? "months" : "month" }`;
                }else{
                  filteredObject["Age"] = "";
                }
              }
            }else { 
              filteredObject["Age"] = "";
            }
            // console.log(parseInt(object.DateOfBirth.split("-")[0]))
          }
        });
        return filteredObject;
      });
    }

    // func to combine 3 fields ()
    const structureFields = (data) => {
      let myArr = data;
      myArr.forEach(object => {
        
        // structuring for name (fname, lname, pfp)
        const nameArray = `${object["FirstName"]} ${object["LastName"]}`
        object["Name"] = nameArray;
        delete object["FirstName"];
        delete object["LastName"];
        
      });
      
      return myArr;
    }

    // arranging fields in desired order

const arrangeFields = (arr, fieldOrder) =>{
  // Create a new array to store the rearranged objects
  const newArr = arr.map(obj => {
    const newObj = {};
    
    // Iterate through the desired field order
    fieldOrder.forEach(field => {
      // Copy the field-value pairs in the desired order to the new object
      if (obj.hasOwnProperty(field)) {
        newObj[field] = obj[field];
      }
    });

    return newObj;
  });

  return newArr;
}
 
    const getAllPt = ()=>{
      axios.get("/api/getAllPatients")
      .then((response)=>{
        let initData = response.data;

        initData = filterObjectsByFields(initData,[ "Email","FirstName", "LastName","DateOfBirth", "ProfilePicture", "BloodGroup", "LastVisit", "Paid"])
        
        // set Mobile also
        let finalData =structureFields(initData)
        finalData = arrangeFields(finalData,fieldOrder)

        setData(finalData);
      })
      .catch((error)=>{
        console.log(error.message);
      })
    }

    getAllPt();
  
   
  }, [fetch])

  const refetchData = ()=>{
    setFetch(!fetch);
  }
  

  
  return ( 
    <div className={`${adminSidebarOpen === true ? "ml-[10px] md:ml-[262px]" : "ml-[10px]" }`}>

    {data && <PtDataTable data={data} refetchData = {refetchData}/>}
    
    </div>
  )
}

export default Patients