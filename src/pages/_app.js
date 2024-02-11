// added bootstrap
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import AdminNav from "../../components/AdminNav";
import { store } from "../../store";
import { Provider} from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import AdminPaths from "../../components/AdminPaths";
import HomePath from "../../components/HomePath";
import PtSidebar from "../../components/PtSidebar";
import DocSidebar from "../../components/DocSidebar";
import { useEffect, useState } from "react";
import Jwt from "jsonwebtoken";
import axios from "axios";

// import "../styles/admin-globals.css"     << will import directly in admin pages

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // let adminSidebarOpen = useSelector((state)=>state.adminPFP.ProfilePicture)

  useEffect(() => {

    const handleBeforeUnload = (event) => {
      event.preventDefault();

      //  just update the last visit
      let token = localStorage.getItem("token");

      if (token) {
        let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

        const updateData = {
          Email: decryptedToken.Email,
          LastVisit: new Date(Date.now()),
        };

        if (decryptedToken.UserType === "Patient") {
          // update last visit
          axios.put(`/api/updatePatients`, updateData).catch((error) => {
            console.log(error.message);
          });
        }else if(decryptedToken.UserType === "Doctor"){
          // update last visit
          axios.put(`/api/updateDoctors`, updateData).catch((error) => {
            console.log(error.message);
          });
        }
      }
    };

    // window.addEventListener("beforeunload", handleBeforeUnload); 

    // Clean up the event listener when the component unmounts
    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, []);

  return (
    <> 
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* // jquery scripts  */}
          <link rel="stylesheet" href="/build/css/intlTelInput.css" />
       
          <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        />
        {/* // flowbite tailwind script  */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/datepicker.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
           {/* // for phone no code  */}
           <script src="https://code.jquery.com/jquery-latest.min.js"></script>
           <script src="/build/js/intlTelInput.min.js"></script>
        </Head>

        {/* // show admin navbar if admin page open  */}
        {/* dont show for admin login and register */}
        {router.pathname.includes("/admin/") && <AdminNav />}

        {/* // show admin sidebar if admin page open  */}
        {/* dont show for admin login and register */}
        {!router.pathname.includes("/edit/")
         && router.pathname.includes("/admin/") 
         && !router.pathname.includes("/add/") 
         && <div style={{zIndex:5}}><AdminSidebar /></div>}

        {/* // show admin breadcrums if admin page open  */}
        {/* dont show for dashboard page, and admin login and register */}
        {router.pathname.includes("/admin/") &&
          !router.pathname.includes("dashboard") &&
          !router.pathname.includes("/edit/") &&
          !router.pathname.includes("/add/") &&
          router.pathname != "/admin-login" &&
          router.pathname != "/admin-register" && <AdminPaths />}

        {/* // profile sidebars ----  */}
        {!router.pathname.includes("/admin/")  ? <PtSidebar /> : null}
        {!router.pathname.includes("/admin/")  ? <DocSidebar /> : null} 

        {/* // don't show normal navbar if admin page open  */}
        {!(router.pathname.split("/")[1] === "admin") && <Navbar />}
        {router.pathname.includes("/patient/") ||
        router.pathname.includes("/doctor/") && !router.pathname.includes("add-slots") && !router.pathname.includes("edit-slots") ? (
          <HomePath />
        ) : null}

        {/* // other pages -------- */}
        <Component {...pageProps} />
        {/* // other pages --------  */}

        {/* // don't show normal footer if admin page open  */}
        {!router.pathname.includes("/admin/") ? <Footer /> : null}
      </Provider>
    </>
  );
}
export default MyApp;
