import React, { useState } from "react";
import Addfield from "./Addfield";
import { useSelector, useDispatch } from "react-redux";
import {
  updateEmpProfileExtraFields,
  updateUsrProfileExtraFields,
} from "../slices/profileStructureSlice";

function ShowStructure(props) {
    // background settings
    const websiteColorDark = useSelector((state) => state.website.websiteColorDark);
    const themeBgDark = {
      backgroundColor: websiteColorDark,
    };


  const dispatch = useDispatch();

  // get both structures from redux here and use whichever needed
  let EMP_PROFILE = useSelector((state) => state.profileStructure.EMP_PROFILE);
  let USR_PROFILE = useSelector((state) => state.profileStructure.USR_PROFILE);
  let myArray = [];

  if (props.ForProfile === "EMP") {
    myArray = EMP_PROFILE;
  } else if (props.ForProfile === "USR") {
    myArray = USR_PROFILE;
  }

  const [showAddField, setShowAddField] = useState(false);

  const openAddField = () => {
    setShowAddField(true);
  };
  const closeAddField = () => {
    setShowAddField(false);
  };

  const removeExtraField = (elementAt) => {
    let arrayOfFields = [];
    if (props.ForProfile === "EMP") {
      arrayOfFields = myArray[10].fields;
    } else if (props.ForProfile === "USR") {
      arrayOfFields = myArray[3].fields;
    }

    const before = arrayOfFields.slice(0, elementAt);
    const after = arrayOfFields.slice(elementAt + 1);
    const finalArr = before.concat(after);

    // updating in redux Store
    if (props.ForProfile === "EMP") {
      dispatch(updateEmpProfileExtraFields(finalArr));
    } else if (props.ForProfile === "USR") {
      dispatch(updateUsrProfileExtraFields(finalArr));
    }
  };

  return (
    <div className="w-full  px-3 ">
      {myArray.map((item, index) => (
        <div key={item.heading}>
          {item.heading === null ? (
            <div
              className={`p-3 my-4  rounded-sm `}
            >
              <p className="" key={item.fieldName}>
                <span className="font-semibold text-lg">
                  {item.fieldName}
                  {" : "}{" "}
                </span>{" "}
                <p className="text-lg inline">{item.fieldType}</p>
              </p>
            </div>
          ) : item.heading === "Extra" ? (
            // for extrra fieldss
            <div
              className={` rounded-sm p-3 pb-4 mb-4`}
            >
              <p className="text-lg font-semibold my-2 mb-3">
                {"Extra Fields"}
                {/* // add field button  */}
                <button
                  className={` h-8 text-gray-100 px-2 rounded-sm ml-3`}
                  onClick={openAddField}
                  style={themeBgDark}
                >
                  <span className="text-sm font-light mb-3">Add Field</span>
                </button>
              </p>
              {item.fields.length === 0 ? (
                <p className="my-4 mx-1 text-gray-700">No extra fields added</p>
              ) : (
                item.fields.map((exf, exfIndex) => (
                  <div className="ml-4" key={exf.heading || exf.fieldName}>
                    {exf.heading === null ? (
                      // heading fields of extra ----
                      <div className="my-3">
                        &nbsp;&nbsp;
                        {/* // remove field button  */}
                        <div className="inline mr-2">
                          <button
                            className="py-1 px-2 mr-2"
                            onClick={() => {
                              removeExtraField(exfIndex);
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                        <span className="text-lg font-semibold">
                          {exf.fieldName}
                          {" : "}
                        </span>{" "}
                        <p className="text-lg inline">{exf.fieldType}</p>
                      </div>
                    ) : (
                      <div>
                        {/* // direct field of extra  ----*/}
                        <div className="mt-3">
                          &nbsp;&nbsp;
                          {/* // remove field button  */}
                          <div className="inline mr-2">
                            <button
                              className="py-1 px-2 mr-2"
                              onClick={() => {
                                removeExtraField(exfIndex);
                              }}
                            >
                              🗑️
                            </button>
                          </div>
                          <span className="text-lg font-semibold">
                            {exf.heading}
                          </span>
                        </div>
                        {exf.fields.map((i) => (
                          <p className="ml-16" key={i.fieldName}>
                            <span className="font-semibold text-lg">
                              {i.fieldName}
                              {" : "}
                            </span>{" "}
                            <p className="text-lg inline">{i.fieldType}</p>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
              {/* // for extrra fieldss */}
            </div>
          ) : (
            <div
              className={`w-full  rounded-sm px-3 py-4 ${
                index === 0 ? "mt-0" : "mt-4"
              }`}

            >
              <p className="text-lg font-bold mt-4 inline">{item.heading}</p>
              {item.fields.map((i) => (
                <p className="ml-10 mt-3" key={i.fieldName}>
                  <span className="font-semibold text-lg">
                    {i.fieldName}
                    {" : "}{" "}
                  </span>{" "}
                  <p className="text-lg inline">{i.fieldType}</p>
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
      {showAddField && <Addfield close={closeAddField} ForProfile={props.ForProfile} />}
    </div>
  );
}

export default ShowStructure;
