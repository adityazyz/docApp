import { useRouter } from 'next/router'
import React from 'react'
import ProfileSettingsModal from '../../../../components/ProfileSettingsModal'

function DoctorProfile() {
    
    const router = useRouter();
  
  return (
    <div>
        <ProfileSettingsModal userEmail={router.query.email}/>
    </div>
  )
}

export default DoctorProfile