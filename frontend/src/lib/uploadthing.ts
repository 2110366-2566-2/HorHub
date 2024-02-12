import { generateUploadButton } from "@uploadthing/react";
 
export const UploadButton = generateUploadButton({
    url: process.env.REACT_APP_BACKEND_URL + "/api/uploadthing",
})