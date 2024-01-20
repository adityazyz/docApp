import React, { useEffect, useState } from 'react'
import ProfileSettingsModal from '../../../components/ProfileSettingsModal'
import Jwt from "jsonwebtoken";

function ProfileSettings() {
  const [email, setEmail] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
      if (token !== null) {
        // decode it and use values
        let decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);
        setEmail(decryptedToken.Email);
      }

  }, [])
   
  return (
    <>{email && <ProfileSettingsModal userEmail = {email}/> }</>
  )
}

export default ProfileSettings