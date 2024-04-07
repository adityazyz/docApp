import React, { useEffect, useState } from "react";
import DoctorProfile from "../../components/DoctorProfile";
import { useRouter } from "next/router";
import axios from "axios";

function doctorProfile() {
  const router = useRouter();

  const [data, setData] = useState();

  useEffect(() => {
    // check if user directed from random page to this profile
    //check for doctorEmail in query

    if (!router.query.data && !router.query.doctorEmail) {
      const localData = localStorage.getItem("data");
      if (localData) {
        setData(JSON.parse(localData));
      } else {
        router.back();
      }
    } else if (router.query.doctorEmail) {
      axios
        .get(`/api/getDoctors?email=${router.query.doctorEmail}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      localStorage.setItem("data", router.query.data);
      setData(JSON.parse(router.query.data));
    }
  }, []);

  return <div>{data && <DoctorProfile data={data} />}</div>;
}

export default doctorProfile;
