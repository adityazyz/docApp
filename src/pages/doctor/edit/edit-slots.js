import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//WILL GET CURRENT day SLOT TIMING DATA FROM ROUTER (JSON STRING)  + email

function editSlots() {
  const emitterConfig = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const router = useRouter();
  const [start, setStart] = useState([
    "6:00 am",
    "6:15 am",
    "6:30 am",
    "6:45 am",
    "7:00 am",
    "7:15 am",
    "7:30 am",
    "7:45 am",
    "8:00 am",
    "8:15 am",
    "8:30 am",
    "8:45 am",
    "9:00 am",
    "9:15 am",
    "9:30 am",
    "9:45 am",
    "10:00 am",
    "10:15 am",
    "10:30 am",
    "10:45 am",
    "11:00 am",
    "11:15 am",
    "11:30 am",
    "11:45 am",
    "12:00 pm",
    "12:15 pm",
    "12:30 pm",
    "12:45 pm",
    "1:00 pm",
    "1:15 pm",
    "1:30 pm",
    "1:45 pm",
    "2:00 pm",
    "2:15 pm",
    "2:30 pm",
    "2:45 pm",
    "3:00 pm",
    "3:15 pm",
    "3:30 pm",
    "3:45 pm",
    "4:00 pm",
    "4:15 pm",
    "4:30 pm",
    "4:45 pm",
    "5:00 pm",
    "5:15 pm",
    "5:30 pm",
    "5:45 pm",
    "6:00 pm",
    "6:15 pm",
    "6:30 pm",
    "6:45 pm",
    "7:00 pm",
    "7:15 pm",
    "7:30 pm",
    "7:45 pm",
    "8:00 pm",
    "8:15 pm",
    "8:30 pm",
    "8:45 pm",
    "9:00 pm",
    "9:15 pm",
    "9:30 pm",
    "9:45 pm",
    "10:00 pm",
    "10:15 pm",
    "10:30 pm",
    "10:45 pm",
  ]);

  const [end, setEnd] = useState([
    "6:15 am",
    "6:30 am",
    "6:45 am",
    "7:00 am",
    "7:15 am",
    "7:30 am",
    "7:45 am",
    "8:00 am",
    "8:15 am",
    "8:30 am",
    "8:45 am",
    "9:00 am",
    "9:15 am",
    "9:30 am",
    "9:45 am",
    "10:00 am",
    "10:15 am",
    "10:30 am",
    "10:45 am",
    "11:00 am",
    "11:15 am",
    "11:30 am",
    "11:45 am",
    "12:00 pm",
    "12:15 pm",
    "12:30 pm",
    "12:45 pm",
    "1:00 pm",
    "1:15 pm",
    "1:30 pm",
    "1:45 pm",
    "2:00 pm",
    "2:15 pm",
    "2:30 pm",
    "2:45 pm",
    "3:00 pm",
    "3:15 pm",
    "3:30 pm",
    "3:45 pm",
    "4:00 pm",
    "4:15 pm",
    "4:30 pm",
    "4:45 pm",
    "5:00 pm",
    "5:15 pm",
    "5:30 pm",
    "5:45 pm",
    "6:00 pm",
    "6:15 pm",
    "6:30 pm",
    "6:45 pm",
    "7:00 pm",
    "7:15 pm",
    "7:30 pm",
    "7:45 pm",
    "8:00 pm",
    "8:15 pm",
    "8:30 pm",
    "8:45 pm",
    "9:00 pm",
    "9:15 pm",
    "9:30 pm",
    "9:45 pm",
    "10:00 pm",
    "10:15 pm",
    "10:30 pm",
    "10:45 pm",
    "11:00 pm",
  ]);

  useEffect(() => {
	const findIndex = (array, targetElement) => {
		for (let i = 0; i < array.length; i++) {
		  if (array[i] === targetElement) {
			return i; // Return the index if the element is found
		  }
		}
	
		return -1; // Return -1 if the element is not found
	  };
    // first get the data from the route string
    // example data below

  let data = [];
    if(router.query.currentSlots){
      data = JSON.parse(router.query.currentSlots);
    setSlots(data);

    let startIndex = -1;
    let endIndex = -1;
    // now set start and end selected index
    data.map((item)=>{
		// for start
    	if(start.includes(item["Start"])){
			let currentIndex = findIndex(start,item["Start"])
			if( startIndex === -1 && currentIndex > startIndex){
				startIndex = currentIndex;
			}
		}// for end
		if(start.includes(item["End"])){
			let currentIndex = findIndex(start,item["End"])
			if( currentIndex > endIndex){
				endIndex = currentIndex;
			}
		}

		// setting actual index based on data received
		setTimeout(() => {
			setStartIndexSelected(startIndex);
			setEndIndexSelected(endIndex);
		}, 200);
    })
    }
  }, []);

  const [slots, setSlots] = useState([{ Start: "", End: "" }]);
  const [startIndexSelected, setStartIndexSelected] = useState(-1);
  const [endIndexSelected, setEndIndexSelected] = useState(-1);

  // set current starts and ends so that user don't select them in next slot, if end or start in prev bloack is not selected
  const [currentStart, setCurrentStart] = useState();
  const [currentEnd, setCurrentEnd] = useState();

  const findIndex = (array, targetElement) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === targetElement) {
        return i; // Return the index if the element is found
      }
    }

    return -1; // Return -1 if the element is not found
  };

  const addSlots = () => {
    setSlots((prevData) => [...prevData, { Start: "", End: "" }]);
  };
  // slot removing function
  const removeSlots = (index) => {
    setSlots((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };
  const handleSlotChange = (index, key, value) => {
    setSlots((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        [key]: value,
      };
      return newData;
    });
    
  };

  const updateOptions = () =>{

      let startIndex = null;
      let endIndex = null;
    // for start
    slots.map((slotItem)=>{ 
      start.map((arrayItem, arrayIndex)=>{
        // if slot Start item matched with start array item
          if(slotItem["Start"] === arrayItem){
            // if index above null set initial value
            // else if the set start index is greated, make it smaller if you can
            if((startIndex === null) || (startIndex > arrayIndex)){
              startIndex = arrayIndex;
            }
          }
      });
    });

    // for end
    slots.map((slotItem)=>{ 
      start.map((arrayItem, arrayIndex)=>{
        // if slot Start item matched with start array item
          if(slotItem["End"] === arrayItem){
            // if index above null set initial value
            // else if the set start index is greated, make it smaller if you can
            if((startIndex === null) || (endIndex < arrayIndex)){
              endIndex = arrayIndex;
            }
          }
      });
    });

    // now set the selected index values if they are not null
    if(startIndex){
      setStartIndexSelected(startIndex);
    }
    if(endIndex){
      setEndIndexSelected(endIndex-1)
    }
  }

  const handleSubmit = ()=>{
    if (router.query.email && router.query.activeDay){
      let finalObj = {
        Email : router.query.email
      }
      finalObj[router.query.activeDay] = slots
  
      axios.put("/api/updateSlots", finalObj)
      .then((response)=>{
        if(response.data.success === true){
          toast.success("Slot edit successful.", emitterConfig)
          setTimeout(() => {
            router.push("/doctor/schedule-timings");
          }, 2000);
        }
      })
      .catch((error)=>{
        toast.error("Some error occured", emitterConfig);
        console.log(error.message);
        setSlots([{ Start: "", End: "" }]);
      })
    }else{
      router.push("/doctor/schedule-timings");
    }
  }
  
  useEffect(() => {
    updateOptions()
  
  }, [slots])

  // if no email present send to schedule timings page
useEffect(() => {
  if(!router.query.email){
    router.push("/doctor/schedule-timings");
  }
}, [])

  return (
    <div>
      {/* /* // <!-- Edit Time Slot Modal --> */}
      <div className="h-auto pb-8 md:p-0 sm:h-[100vh] w-[100vw]  mt-10">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Time Slots</h5>
            </div>
            <div className="modal-body">
              <div>
                {slots.length > 0 && <div className="hours-info">
                  {slots.map((item, index) => {
                    return (
                      <div
                        key={`slot-${index}`}
                        className="row form-row hours-cont"
                      >
                        <div className="col-12 col-md-10">
                          <div className="row form-row">
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label>Start Time</label>
                                <select
                                  className="form-control"
                                  value={item["Start"]}
                                  onChange={(e) => {
                                    // update options                              
                                    const newIndex = findIndex(
                                      start,
                                      e.target.value
                                    );
                                    setCurrentStart(newIndex);
                                    if (
                                      startIndexSelected === -1 ||
                                      newIndex < startIndexSelected
                                    ) {
                                      setStartIndexSelected(newIndex);
                                    }
                                    handleSlotChange(
                                      index,
                                      "Start",
                                      e.target.value
                                    );
                                  }}
                                >
                                  <option>-</option>
                                  {start.map((itemTime, i) => (
                                    <option
                                      key={`${itemTime}-${i}`}
                                      disabled={
                                        startIndexSelected === -1
                                          ? false
                                          : currentStart === i
                                          ? true
                                          : startIndexSelected <= i &&
                                            i <= endIndexSelected
                                      }
                                    >
                                      {itemTime}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label>End Time</label>
                                <select
                                  className="form-control"
                                  value={item["End"]}
                                  onChange={(e) => {
                                    const newIndex = findIndex(
                                      end,
                                      e.target.value
                                    );
                                    setCurrentEnd(newIndex);
                                    if (
                                      endIndexSelected === -1 ||
                                      endIndexSelected < newIndex
                                    ) {
                                      setEndIndexSelected(newIndex);
                                    }
                                    handleSlotChange(
                                      index,
                                      "End",
                                      e.target.value
                                    );
                                  }}
                                >
                                  <option>-</option>
                                  {end.map((itemTime, i) => (
                                    <option
                                      key={`${itemTime}-${i}`}
                                      disabled={
                                        endIndexSelected === -1
                                          ? false
                                          : currentEnd === i
                                          ? true
                                          : startIndexSelected <= i &&
                                            i <= endIndexSelected
                                      }
                                    >
                                      {itemTime}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-2">
                          <label className="d-md-block d-sm-none d-none">
                            &nbsp;
                          </label>
                          <button
                            className="btn btn-danger trash"
                            onClick={() => {
                              removeSlots(index);
                            }}
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>}
				{
					slots.length === 0 && <div className="pl-1 pr-3 pt-2 pb-4">
						No slots added. Click on the button below to add the slots.
					</div>
				}

                <div className="add-more mb-3">
                  <button
                    className="add-hours text-blue-400"
                    onClick={addSlots}
                  >
                    <i className="fa fa-plus-circle "></i> Add More
                  </button>
                </div>
                <div className="submit-section text-center">
                  <button
                    type="submit"
                    className="btn btn-danger submit-btn"
                    onClick={() => {
                      router.push("/doctor/schedule-timings");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* // <!-- /Edit Time Slot Modal --> */}
      <ToastContainer
          position="top-right"
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
  );
}

export default editSlots;
