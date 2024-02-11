import { useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext"

function MailVerifyPage() {

    const navigate = useNavigate();

    const {currentUser, isLoading} = useUser()

    if (isLoading) {
        return (
            <div className="page justify-center">
                Loading...
            </div>
        )
    }

    if (!currentUser) {
        navigate('/')
    }

    if (currentUser?.isVerified) {
        navigate('/')
    }

    return (
        <div className="page justify-center">
            <div className="w-4/5 flex flex-col rounded-xl border border-blue-500 p-5 gap-3">
                <div className="w-full text-center font-bold text-lg">
                    Verifying Account
                </div>
                <div className="w-full">Please verify your account in mailbox. The mail had been sent to {currentUser?.email}</div>
            </div>
        </div>
    )
}

export default MailVerifyPage