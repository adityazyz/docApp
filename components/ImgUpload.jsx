

// ------------- TODO ------------
// 1) use toasts for error msgs

// 2) try deciding a single name for profile pic of the user
// when new image is uploaded, delete existing image of that name 
// and then save new image from that name into the cloud storage
// once the new image is stored, get its url and update the profile pic preview


import React, { useState } from 'react'
import supabase from '../middleware/supabaseConfig';
import Image from 'next/image';

const BUCKET_NAME = "emp-profile"

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // function to get public url
    async function getPublicURL(filePath) {
        // Replace 'YOUR_BUCKET_NAME' with the actual name of the bucket where the file is stored.
        const publicURL = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
        return publicURL;
      }

    if (selectedFile) {
      // Use the Supabase client to upload the file to Supabase Storage
      const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(selectedFile.name, selectedFile);

      if (error) {
        console.error('Error uploading file:', error.message);
      } else { 
        // if image uploaded successfully 
        console.log('File uploaded successfully', data.path);
        // get the public url 
        let fileUrl = await getPublicURL(data.path);
        fileUrl = fileUrl.data.publicUrl
        console.log("Public url of uploaded file : ", fileUrl)
      }
    }
  };

  return (
    <div>
    <Image src={'https://oslewzdawxhiqgsaywqv.supabase.co/storage/v1/object/public/emp-profile/doctor-12.jpg'} height={100} width={100} ></Image>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploadComponent;
