import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../middleware/supabaseConfig";
import {
  changeWebsiteColor,
  changeWebsiteName,
  changeWebsiteLogo,
  changeWebsiteFavicon,
} from "../slices/websiteSlice";
import adminCss from "../src/styles/admin.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function WebsiteSettings() {
  useEffect(() => {
    axios
      .get("/api/getSiteSetting")
      .then((response) => {
        let dbData = response.data.data;
        dispatch(
          changeWebsiteColor({
            dark: dbData.websiteColorDark,
            light: dbData.websiteColorLight,
          })
        );
        dispatch(changeWebsiteName(dbData.websiteName));
        // also set our website name....
        // so its doesn't revert back to null
        setNameSelected(dbData.websiteName);

        dispatch(changeWebsiteLogo(dbData.websiteLogo));
        dispatch(changeWebsiteFavicon(dbData.websiteFavicon));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

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

  const BUCKET_NAME = "Website-Setting";

  const paletteRef = useRef(null);

  const dispatch = useDispatch();

  const adminSidebarOpen = useSelector((state)=>state.sidebar.adminSidebarOpen)
  // using values from redux store
  const websiteColorDark = useSelector(
    (state) => state.website.websiteColorDark
  );
  const websiteName = useSelector((state) => state.website.websiteName);

  // below also used to determine initial save
  const OldWebsiteName = websiteName; // used in comparison below to show update toast

  const [colorSelected, setColorSelected] = useState("#ffffff"); // color
  const [colorChanged, setcolorChanged] = useState(false);

  const [nameSelected, setNameSelected] = useState(websiteName);

  const [logoSelected, setLogoSelected] = useState();

  const [faviconSelected, setFaviconSelected] = useState();

  const [nameFocus, setNameFocus] = useState(false);
  const [logoFocus, setLogoFocus] = useState(false);
  const [faviconFocus, setFaviconFocus] = useState(false);

  //to track if any change is made
  const [changeMade, setchangeMade] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // my trackerssss
    let updateMade = false;

    let websiteColorDarkDb = "";
    let websiteColorLightDb = "";
    let websiteNameDb = "";
    let websiteLogoDb = "";
    let websiteFaviconDb = "";

    // handling color submit-------------------------------
    if (colorChanged === true) {
      const hex2rgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      };
      let myRGB = hex2rgb(colorSelected);
      let darkRGB = `rgb(${myRGB.r},${myRGB.g},${myRGB.b})`;
      let lightRGB = `rgba(${myRGB.r},${myRGB.g},${myRGB.b},0.1)`;

      // update both colors in redux store (dark and light)
      dispatch(changeWebsiteColor({ dark: darkRGB, light: lightRGB }));

      // set values for quice access
      websiteColorDarkDb = darkRGB;
      websiteColorLightDb = lightRGB;

      // change state variable in db
      // if initial save , dont run the below code
      if (OldWebsiteName != null) {
        updateMade = true;
        axios
          .put("/api/saveSiteSetting", {
            websiteColorDark: darkRGB,
            websiteColorLight: lightRGB,
          })
          .catch((error) => {
            toast.error({ error }, emitterConfig);
          });
      }
    }

    // function to get public url
    const getPublicURL = async (filePath) => {
      const publicURL = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);
      return publicURL;
    };

    // --------- handling logo and favicon upload to supabase ------------------------------
    // first goes logo
    if (logoSelected) {
      try {
        let newFileName = `Logo-${Date.now()}-${logoSelected.name}`;
        // Use the Supabase client to upload the file to Supabase Storage
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(newFileName, logoSelected);

        if (error) {
          toast.error(`Error : ${error.message}`, emitterConfig);
        } else {
          // get the public url
          let fileUrl = await getPublicURL(data.path);
          fileUrl = fileUrl.data.publicUrl;

          // changing value in redux store
          dispatch(changeWebsiteLogo(fileUrl));

          // setting values for quick access in case we setting initially
          websiteLogoDb = fileUrl;

          // change value in db as well
          if (OldWebsiteName != null) {
            updateMade = true;
            axios
              .put("/api/saveSiteSetting", {
                websiteLogo: fileUrl,
              })
              .catch((error) => {
                toast.error({ error }, emitterConfig);
              });
          }
        }
      } catch (error) {
        toast.error({ error }, emitterConfig);
      }
    }

    // now favicon
    if (faviconSelected) {
      try {
        let newFileName = `Favicon-${Date.now()}-${faviconSelected.name}`;
        // Use the Supabase client to upload the file to Supabase Storage
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(newFileName, faviconSelected);

        if (error) {
          toast.error(`Error : ${error.message}`, emitterConfig);
        } else {
          // get the public url
          let fileUrl = await getPublicURL(data.path);
          fileUrl = fileUrl.data.publicUrl;

          // changing value in redux store
          dispatch(changeWebsiteFavicon(fileUrl));
          // setting values for quick access in case we setting initially
          websiteFaviconDb = fileUrl;

          // change value in db as well
          if (OldWebsiteName != null) {
            updateMade = true;
            axios
              .put("/api/saveSiteSetting", {
                websiteFavicon: fileUrl,
              })
              .catch((error) => {
                toast.error({ error }, emitterConfig);
              });
          }
        }
      } catch (error) {
        toast.error({ error }, emitterConfig);
      }
    }

    // name of website
    if (nameSelected != websiteName) {
      dispatch(changeWebsiteName(nameSelected));

      // setting values for quick access in case we setting initially
      websiteNameDb = nameSelected;

      // change in db too
      // change value in db as well
      if (OldWebsiteName != null) {
        updateMade = true;
        axios
          .put("/api/saveSiteSetting", {
            websiteName: nameSelected,
          })
          .catch((error) => {
            toast.error({ error }, emitterConfig);
          });
      }
    }

    // if initial commit , save all info at once
    if (OldWebsiteName === null) {
      if (
        colorChanged === true &&
        logoSelected &&
        faviconSelected &&
        nameSelected != OldWebsiteName
      ) {
        updateMade = true;

        const myObj = {
          websiteColorDark: websiteColorDarkDb,
          websiteColorLight: websiteColorLightDb,
          websiteName: websiteNameDb,
          websiteLogo: websiteLogoDb,
          websiteFavicon: websiteFaviconDb,
        };

        axios.put("/api/saveSiteSetting", myObj).catch((error) => {
          toast.error({ error }, emitterConfig);
        });
      } else {
        toast.error("Please fill all fields.");
      }
    }

    // if any change made above, show a toast message
    if (updateMade === true) {
      toast("Update Successful !", emitterConfig);
    }
  };

  const themeBgDark = {
    backgroundColor: websiteColorDark,
  };

  const paletteDivStyle = {
    backgroundColor: colorSelected,
    // zIndex:-2
  };

  const inputFocusTheme = {
    borderColor: websiteColorDark,
  };

  return (
    <>
      {/* //// ----------------- WEBSITE SETTING ------------------// */}
      {/*  */}
      <div  className={`w-auto ${adminSidebarOpen === true ? "ml-[10px] md:ml-[262px]" : "ml-[10px]" }   pr-12 `}>
        <div className="col-12 mx-3 bg-white">
          {/* <!-- General --> */}

          <div className={`${adminCss.card} `}>
            <div className={adminCss.cardHeader}>
              <h4 className={adminCss.cardtitle}>General</h4>
            </div>
            <div className={adminCss.cardBody}>
              <form method="PUT">
                <div className="form-group">
                  {/* actual change part  */}
                  <div className="flex  w-[100%] justify-between">
                    {/* // our palette div and selector palette  */}
                    <div className="flex mr-4 ">
                      <label htmlFor="color" className="mt-1">
                        <span className="text-md text-gray-600">
                          Set color theme :{" "}
                        </span>
                      </label>

                      {/* */}
                      <div className=" h-11 flex overflow-hidden ml-3 ">
                        
                        {/* // this input element is clicked by the div above ..and it is under the div  */}
                        <input
                          className={`  opacity-0 h-0 w-0`}
                          ref={paletteRef}
                          // style={{zIndex:-2}}
                          // style={}
                          type="color"
                          name="color"
                          value={colorSelected}
                          onChange={(e) => {
                            setColorSelected(e.target.value);
                            setcolorChanged(true);
                            setchangeMade(true);
                          }}
                        />
                        <div  className=" mb-8 h-8 w-8 rounded-xl bg-gray-400 bg-opacity-30 flex items-center justify-center">
                          <div
                            className=" w-6 h-6 rounded-xl "
                            style={paletteDivStyle}
                            onClick={() => {
                              paletteRef.current.click();
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-10 mt-1">
                      <button
                        style={changeMade ? themeBgDark : null}
                        type="submit"
                        className={`z-20 px-3 py-2 h-auto text-white rounded-lg ${
                          !changeMade
                            ? "bg-gray-500 opacity-30 pointer-events-none"
                            : null
                        }`}
                        onClick={handleSubmit}
                        disabled={changeMade ? false : true}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="mb-2">Website Name</label>
                  <input
                    type="text"
                    className={`${adminCss.formControl}`}
                    value={nameSelected}
                    style={nameFocus ? inputFocusTheme : null}
                    onFocus={() => {
                      setNameFocus(true);
                    }}
                    onBlur={() => {
                      setNameFocus(false);
                    }}
                    onChange={(e) => {
                      setNameSelected(e.target.value);
                      setchangeMade(true);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="mb-2">Website Logo</label>
                  <input
                    type="file"
                    className={adminCss.formControl}
                    style={logoFocus ? inputFocusTheme : null}
                    onFocus={() => {
                      setLogoFocus(true);
                    }}
                    onBlur={() => {
                      setLogoFocus(false);
                    }}
                    onChange={(e) => {
                      setLogoSelected(e.target.files[0]);
                      setchangeMade(true);
                    }}
                  />
                  <small className="text-secondary text-gray-200">
                    Recommended image size is <b>150px x 150px</b>
                  </small>
                </div>
                <div className="form-group mb-0">
                  <label className="mb-2">Favicon</label>
                  <input
                    type="file"
                    className={adminCss.formControl}
                    style={faviconFocus ? inputFocusTheme : null}
                    onFocus={() => {
                      setFaviconFocus(true);
                    }}
                    onBlur={() => {
                      setFaviconFocus(false);
                    }}
                    onChange={(e) => {
                      setFaviconSelected(e.target.files[0]);
                      setchangeMade(true);
                    }}
                  />
                  <small className="text-secondary">
                    Recommended image size is <b>16px x 16px</b> or{" "}
                    <b>32px x 32px</b>
                  </small>
                  <br />
                  <small className="text-secondary">
                    Accepted formats : only png and ico
                  </small>
                </div>
              </form>
            </div>
          </div>

          {/* <!-- /General --> */}
        </div>

        {/* // toast container  */}
        <div>
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
      </div>
    </>
  );
}

export default WebsiteSettings;
