import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function multipleSelection() {
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

  const [selectedItems, setSelectedItems] = useState([]); 
  const [specialities, setSpecialities] = useState(["spec1", "spec2", "spec3"])
  // const [selectedSpec, setSelectedSpec] = useState("");
  const [commaSepText, setCommaSepText] = useState(null);

  const removeSelectedItem = (item)=>{
    // first make copy of selectedItems array
    let myArr = selectedItems;

    // setting required arr to original, in case it doesn't get updated
    let requiredArr = selectedItems; 

    // get index of the item to be removed
    let indexOfItem = myArr.indexOf(item);

    // if item present in array, remove it
    if(indexOfItem != -1){
      const arr1 = myArr.slice(0, indexOfItem);
    
      const arr2 = myArr.slice(indexOfItem + 1);
    
      requiredArr = arr1.concat(arr2);
    }

    //now set the original array = required array
    setSelectedItems(requiredArr);
  }

  const addSelectedItem = (item)=>{

    // FIRST CHECK if item already exists in the selectedItems state array
    if(selectedItems.includes(item)){
      toast.error("Item already selected !",emitterConfig)
    }else{

      // updated array = previous state of selectedItems state array + item
      const updatedArray = [...selectedItems,item]
      setSelectedItems(updatedArray);
    }
  }

  const handleEnterPressed = (e)=>{
    
    if(e.key === "Enter"){
      addSelectedItem(e.target.value);
      // also clear the input field
      e.target.value = "";
    }
  }

  const generateCommaSepText = ()=>{
    let text = selectedItems.join(",");
    setCommaSepText(text);
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center w-[100wh] h-[50vh] bg-fuchsia-300 overflow-x'>
        {/* // the container that shows selected items + input field */}
        <div className='w-[80%] bg-gray-200 rounded-xl p-3 flex flex-wrap mt-5'>
          {/* // showing selected items, if any  */}
          {(selectedItems.length > 0) && selectedItems.map((item,index)=>{
            return <div key={index} className='mr-3 px-2 pt-1 rounded-lg flex bg-white mb-2'>
            <div className='text-lg '>{item}</div>
            <button className='h-[100%] text-sm pl-1'
            onClick={()=>{
              removeSelectedItem(item)
            }}
            >❌</button>
            </div>
          })}
          {/* // Our input field  */}
          <input type="text" className='mr-3 mb-2 text-lg py-1 px-2 rounded-lg outline-none bg-white '
            onKeyUp={handleEnterPressed}
          />

          {/* // Our dropdown menu  */}
          <select className='mr-3 mb-2 text-lg py-1 px-2 rounded-lg outline-none bg-white '
          onChange={(e)=>{
            addSelectedItem(e.target.value); // add selected item
            e.target.value = ""; // set back to default value
          }}
          >
          <option value={""}>Select</option>
            {specialities.map((item,index)=>{
              return <option key= {index} value={item}  >{item}</option>
            })}
          </select>
        </div>

        {/* // EXPORT button  */}
        <div className='flex justify-between w-[80%]'>
          <h4 className='text-sm mt-2 ml-1 text-gray-800 font-light' >Type and press enter to add Services or select from the Dropdown provided.</h4>
          <button className='bg-black text-gray-200 mr-3 mt-2 mb-4 p-2 rounded-lg'
          onClick={generateCommaSepText}
          >Export</button>
        </div>

        {/* // display OF EXPORTED comma seperated text  */}
        
          {commaSepText && commaSepText}

          {/* // ----our toast container---  */}
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
    </>
  )
}

export default multipleSelection