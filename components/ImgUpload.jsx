// ------------- TODO ------------
// 1) use toasts for error msgs

// 2) try deciding a single name for profile pic of the user
// when new image is uploaded, delete existing image of that name
// and then save new image from that name into the cloud storage
// once the new image is stored, get its url and update the profile pic preview

// to delete photo from cloud storage>>>>>>>>>>>
// const filePath = 'path/to/your/file.txt';
// async function deleteFile() {
//   try {
//     const response = await supabase.storage.from('your-storage-bucket').remove([filePath]);
//     console.log('File deleted:', response);
//   } catch (error) {
//     console.error('Error deleting file:', error);
//   }
// }

import React, { useState } from "react";
import supabase from "../middleware/supabaseConfig";
import Image from "next/image";

const BUCKET_NAME = "emp-profile";

const deleteImage = async () => {
  let path = "img-01.jpg";
  try {
    const response = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);
    console.log("File deleted:", response);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [filePublicUrl, setfilePublicUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // function to get public url
    async function getPublicURL(filePath) {
      // Replace 'YOUR_BUCKET_NAME' with the actual name of the bucket where the file is stored.
      const publicURL = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);
      return publicURL;
    }

    if (selectedFile) {
      try {
        let newFileName = `${Date.now()}-${selectedFile.name}`;
        // Use the Supabase client to upload the file to Supabase Storage
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(newFileName, selectedFile);

        if (error) {
          console.error("Error uploading file:", error.message); 
        } else {
          // if image uploaded successfully
          console.log("File uploaded successfully", "path is => ", data.path);
          // get the public url
          let fileUrl = await getPublicURL(data.path);
          fileUrl = fileUrl.data.publicUrl;
          console.log("Public url of uploaded file : ", fileUrl);
          setfilePublicUrl(fileUrl);
        }
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <div>
      <button className="h-16 w-16" onClick={deleteImage}> delete photo</button>
      <Image
        src={filePublicUrl}
        height={100}
        width={100}
        alt="profile picture"
      ></Image>
      <input type="file" onChange={handleFileChange} />
      <button className="bg-black text-white p-1" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUploadComponent;
