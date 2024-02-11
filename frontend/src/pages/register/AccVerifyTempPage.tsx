import { useUser } from "../../lib/context/UserContext"
import LoadingPage from "../etc/LoadingPage"

function AccVerifyTempPage() {



    const {currentUser, isLoading} = useUser()

    if (isLoading) {
        return <LoadingPage />
    }

    

    return (
    <div className="page">

    </div>)
}

export default AccVerifyTempPage