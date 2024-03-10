// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ImageType } from "react-images-uploading";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export async function uploadImages(files: Array<ImageType | string>, path: string): Promise<Array<string>> {
    const result = await Promise.all(
      files.map(async (file) => {
        if (typeof file !== "string" && file.file) { // real file
          const fileRef = ref(storage, `${path}/${(new Date()).getTime()}-${file.file.name}`)
          const fileURL = await uploadBytes(fileRef, file.file).then( async () => {
            const fileURL = await getDownloadURL(fileRef)
            return fileURL
          })
          return fileURL
        }
        else {  // just URL string
          return file as string
        }
      })
    )

    return result
}
