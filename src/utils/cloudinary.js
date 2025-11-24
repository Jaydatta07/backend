import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        // console.log("File uploaded to cloudinary successfully ",response.url)
        fs.unlinkSync(localFilePath) //we delete the file from locally after uploading into cloudinary, and this action is syncronous because we dont want to delete the file in the background,we want to delete this file now and then do the next task after deletion of file
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //removes the locally saved temporary files as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }