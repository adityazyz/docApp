// added bootstrap
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import AdminNavbar from "../../components/AdminNavbar";

// import "../styles/admin-globals.css"     << will import directly in admin pages

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />

      
      {/* // show admin navbar if admin page open  */}
      {(router.pathname === "/admin" ) && <AdminNavbar/>}
      
      {/* // don't show normal navbar if admin page open  */}
      {(router.pathname !== "/admin" ) && <Navbar/>}
      <Component {...pageProps} />
      {/* // don't show normal footer if admin page open  */}
      {(router.pathname !== "/admin" ) && <Footer/>}

    </>
  );
}
export default MyApp;