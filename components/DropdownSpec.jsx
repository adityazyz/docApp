import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";

function DropdownSpec({email, preSelected , itemArray, serv,  updateSelectedArr}) {
  const myRef = useRef();
  const [focused, setFocused] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  // initial value as all items
  const [filteredItemArray, setFilteredItemArray] = useState(itemArray); 
  const [selectedItems, setSelectedItems] = useState(preSelected); 

  // func to remove ..expired Specializations from account
  const removeOldSpec = () =>{
    let arr = preSelected;

    preSelected.map((item)=>{
      // if any selected spec not in item array
      if(!itemArray.includes(item)){
        arr = preSelected.filter(function(i) {
          return i !== item
      })
      }
    })

    //set preSelected === new filtered array
    setSelectedItems(arr)
    // also update in db ..so that the deleted spec is removed permanently
    const dt = {
      Email : email,
      Service : {
        Specializations : arr,
        Services : serv
      }
    }
    axios.put("/api/updateDoctors", dt)
    .catch((error)=>{
      console.log(error.message)
    })
    
  }

  // on load ...remove oldSpec
  useEffect(() => {
   removeOldSpec();
  }, [])
  

  const removeSelectedItem = (item) => {
    const updatedItems = selectedItems.filter((selectedItem) =>
      selectedItem.toLowerCase() !== item.toLowerCase()
    );
    setSelectedItems(updatedItems);
    updateSelectedArr(updatedItems); // update arr in profile settings
  };

  const addSelectedItem = (item) => {
    if (!selectedItems.includes(item)) {
      const updatedItems = [...selectedItems, item];
      setSelectedItems(updatedItems);
      updateSelectedArr(updatedItems); // update arr in profile settings

    }
  };

  const handleEnterPressed = (e) => {
    if (e.key === "Enter") {
      const inputValue = e.target.value.toLowerCase();
      if (itemArray.map((item) => item.toLowerCase()).includes(inputValue)) {
        addSelectedItem(inputValue);
      }
      setCurrentInputValue("");
    }
  };

  return (
    <>
     
        <div className={`w-[100%] bg-white overflow  rounded-sm px-3 h-auto flex-wrap flex items-center  border-1 ${focused ? "border-gray-400" : "border-gray-300"}`}
          onClick={() => {
            myRef.current.focus();
          }}
        >
          {(selectedItems.length > 0) && selectedItems.map((item, index) => (
            <div key={index} className='mr-3 my-2 px-2 py-[6px] rounded-xs border-1 border-gray-300 flex items-center justify-center bg-[#2a94f2] text-white '>
              <div className='text-[16px]'>{item}</div>
              <button className='h-[100%] text-sm pl-1'
                onClick={() => {
                  removeSelectedItem(item);
                }}
              >
                <span className='text-xs ml-2 mr-1'>X</span>
              </button>
            </div>
          ))}
          <div className='relative'>
            <input
              type="text"
              className={`w-40 mr-3 my-2 text-sm py-2 px-2 rounded-sm outline-white bg-white border-1 border-white ${selectedItems.length < itemArray.length ? null : "hidden"}`}
              placeholder={`Enter Specialization`}
              value={currentInputValue}
              onChange={(e) => {
                setFocused(true)
                setCurrentInputValue(e.target.value);
                setFilteredItemArray(
                  itemArray.filter((item) =>
                    item.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              }}
              onKeyUp={handleEnterPressed}
              ref={myRef} 
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                // wait before blurring 
                setTimeout(() => {
                  setFocused(false);
                }, 100);
              }}
              onClick={()=>{
                setFocused(true);
              }}
            />
            {((focused === true) && filteredItemArray.length > 0) &&
              <div className='absolute top-11 z-20'>
                <ul className='bg-white border-1 border-gray-400 rounded-sm w-40'>
                  {filteredItemArray.map((item) =>
                    !selectedItems.includes(item) && (
                      <li
                        key={item}
                        className='pl-3 py-1 hover:bg-gray-200'
                        onClick={() => {
                          console.log("item clicked")
                          addSelectedItem(item);
                          setCurrentInputValue("");
                        }}
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            }
          </div>
        </div>
      
    </>
  )
}

export default DropdownSpec;