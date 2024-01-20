// for serv, no need for dropdown
import React, { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

function DropdownSpec({title, preSelected, updateSelectedArr }) {
  const myRef = useRef();
  const [focused, setFocused] = useState(false); 
  const [selectedItems, setSelectedItems] = useState(preSelected);

  

  const removeSelectedItem = (item) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem.toLowerCase() !== item.toLowerCase()
    );
    setSelectedItems(updatedItems);
    // update arr in profile settings

      updateSelectedArr(updatedItems); 

  };

  const addSelectedItem = (item) => {
    if (!selectedItems.includes(item)) { 
      const updatedItems = [...selectedItems, item];
      setSelectedItems(updatedItems);
       // update arr in profile settings

        updateSelectedArr(updatedItems);
   
    }
  };

  const handleEnterPressed = (e) => {
    if (e.key === "Enter") {
      addSelectedItem(e.target.value);

      e.target.value = "";
    }
  };

  return (
    <>
      <div
        className={`w-[100%] bg-white overflow  rounded-sm px-3 h-auto flex-wrap flex items-center  border-1 ${
          focused ? "border-gray-400" : "border-gray-300"
        }`}
        onClick={() => {
          myRef.current.focus();
        }}
      >
        {selectedItems.length > 0 &&
          selectedItems.map((item, index) => (
            <div
              key={index}
              className="mr-3 my-2 px-2 py-[6px] rounded-xs border-1 border-gray-300 flex items-center justify-center bg-[#2a94f2] text-white "
            >
              <div className="text-[16px]">{item}</div>
              <button
                className="h-[100%] text-sm pl-1"
                onClick={() => {
                  removeSelectedItem(item);
                }}
              >
                <span className="text-xs ml-2 mr-1">X</span>
              </button>
            </div>
          ))}
        <div className="relative">
          <input
            type="text"
            className={`w-40 mr-3 my-2 text-sm py-2 px-2 rounded-sm outline-white bg-white border-1 border-white `}
            placeholder={`Enter ${title}`}
            onKeyUp={handleEnterPressed}
            ref={myRef}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default DropdownSpec;
