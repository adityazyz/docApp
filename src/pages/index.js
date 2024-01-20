import Favicon from "../../components/Favicon";
import MainHome from "../../components/MainHome";
import { useEffect } from "react";
import Jwt from "jsonwebtoken";

export default function Document() {
  useEffect(() => {
    //  just update the last visit
    let token = localStorage.getItem("token");

    // logout if signedIn as Admin and it comes back to homepage
    if (token) {
      let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
      if(decryptedToken){
        if (decryptedToken.UserType === "Admin") {
          localStorage.removeItem("token");
        }
      }
    }

  }, []);

  return (
    <>
      {/* using favicon  */}
      <Favicon />

      <MainHome />
    </>
  );
}
