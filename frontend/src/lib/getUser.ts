import Cookies from "js-cookie";

export default async function getUser(){
    const jwt = await fetch(process.env.REACT_APP_BACKEND_URL + "/auth/user",{
        method : "GET",
        credentials : "include"
    })
    if (jwt.status === 200){
        const data = await jwt.json();
        console.log(data);
    }
    return null;
    
}