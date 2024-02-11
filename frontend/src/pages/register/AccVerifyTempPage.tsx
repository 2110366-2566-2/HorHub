import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../../lib/context/UserContext"
import LoadingPage from "../etc/LoadingPage"
import { useEffect } from "react"

function AccVerifyTempPage() {

    let { id } = useParams()
    const navigate = useNavigate()

    const {currentUser, isLoading} = useUser()

    if (isLoading || !id) {
        return <LoadingPage />
    }

    if (!currentUser || currentUser.id != id) {
        navigate('/')
        return <LoadingPage />
    }

    if (currentUser.isVerified) {
        navigate('/verify/success')
    }

    
    fetch(process.env.REACT_APP_BACKEND_URL + "/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials : 'include',
    }).then(() => navigate('/verify/success'))
    

    return <LoadingPage />
}

export default AccVerifyTempPage