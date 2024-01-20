import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DocDataTable from '../../../components/DocDataTable';
import { useSelector } from 'react-redux';
 
function Doctors() {

  const [data, setData] = useState();
  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {

    const fieldOrder = ["Name","Speciality", "createdAt", "Earned", "AccountStatus", "Email", "ProfilePicture"]

    // func to filter data
    const filterObjectsByFields =(objects, fields)=> {
      return objects.map(object => {
        const filteredObject = {};
        fields.forEach(field => {
          if (object.hasOwnProperty(field)) {
            filteredObject[field] = object[field];
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

        // structuring for specialization  
        let speciality = object["Service"]["Specializations"][0] //pick 1 spec
        object["Speciality"] = speciality;
        delete object["Service"];

        

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
 
    const getAllDoc = ()=>{
      axios.get("/api/getAllDoctors")
      .then((response)=>{
        let initData = response.data;
        initData = filterObjectsByFields(initData,["Email", "FirstName", "LastName", "ProfilePicture", "Service", "createdAt", "Earned", "AccountStatus"])
        let finalData =structureFields(initData)
        finalData = arrangeFields(finalData,fieldOrder)

        setData(finalData);
      })
      .catch((error)=>{
        console.log(error.message);
      })
    }

    getAllDoc();
 
  }, [refetch])

  const refetchData = () =>{
    setRefetch(!refetch);
  }
  
 
  return (
    <div className={`${adminSidebarOpen === true ? "ml-[10px] md:ml-[262px]" : "ml-[10px]" }`}>

    {data && <DocDataTable data={data}  refetchData = {refetchData}/>}
    </div>
    
  )
}

export default Doctors