import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShowStructure from "./ShowStructure";

function DashboardUsr() {
  // to access website color
  const websiteColorDark = useSelector((state) => state.website.websiteColorDark);

    const themeBgDark = {
      backgroundColor: websiteColorDark,
    };


  const [listSelected, setListSelected] = useState(true);
  const [settingsSelected, setSettingsSelected] = useState(false);

  const selectList = () => {
    setListSelected(true);
    setSettingsSelected(false);
  };

  const selectSettings = () => {
    setSettingsSelected(true);
    setListSelected(false);
  };

  return (
    <div className="ml-[250px]">
      {/* // to select options Doctors list {ie -> Profiles list or Profile settngs} */}
      <div className={`h-[7vh] flex items-center mb-1`}>
        <div
          className={`ml-4 px-3 py-2 ${
            listSelected ? null : "hover:bg-gray-200"
          } ${listSelected ? "text-white" : "text-gray-700"}  `}
          onClick={selectList}
          style={listSelected? themeBgDark : null}
        >
          Profiles List
        </div>
        <div
          className={`mr-4 border-none px-3 py-2 ${
            settingsSelected ? null: "hover:bg-gray-200"
          } ${settingsSelected ? "text-white" : "text-gray-700"}`}
          onClick={selectSettings}
          style={settingsSelected ? themeBgDark : null}
        >
          Manage Profiles Structure
        </div>
      </div> 

      {/* =========Actual content Starts here ===========  */}

      {/* // profiles lists  */}
      {listSelected && <div className={`h-[66vh] w-auto mx-3 flex items-center justify-center p-5`}

      >
        <h3 className="font-light text-gray-700">
          All profiles with their details like Name, Address, Phone Number etc shown
          here in a table.
        </h3>
      </div>}

      {/* // profiles lists  */}
      {settingsSelected && <div className="h-[auto] w-full flex items-start">
        
          <ShowStructure ForProfile = {"USR"}/>
        
      </div>}

    </div>
  );
}

export default DashboardUsr;
