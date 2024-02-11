import React, { useEffect, useState } from 'react';
import DoctorProfile from '../../components/DoctorProfile';
import { useRouter } from 'next/router';

function doctorProfile() {
    const router = useRouter(); 

    const [data, setData] = useState();

    useEffect(() => {
      if(!router.query.data){
        const localData = localStorage.getItem("data");
        if(localData){
          setData(JSON.parse(localData));
        }else{
          router.back();
        }
      }else{
        localStorage.setItem("data",router.query.data);
        setData(JSON.parse(router.query.data));
    }
    }, [])
    
  return (
    <div>
        {data && <DoctorProfile data = {data}/>}
    </div>
  )
}

export default doctorProfile