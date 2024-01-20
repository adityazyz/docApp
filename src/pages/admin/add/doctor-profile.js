import { useRouter } from 'next/router'
import React from 'react'
import AddDoc from '../../../../components/AddDoc'


function DoctorProfile() {
    
    const router = useRouter()
  
  return (
    <div>
        <AddDoc/>
    </div>
  )
}

export default DoctorProfile