import { useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext"
import { useState } from "react";
import LoadingPage from "../etc/LoadingPage";

function MailVerifyPage() {

    const navigate = useNavigate();

    const {currentUser, isLoading} = useUser()

    const [enableButton, setEnableButton] = useState<boolean>(true)
    const [showResendMessage, setShowResendMessage] = useState<boolean>(false)

    async function resendMail() {
        setEnableButton(false)
        setShowResendMessage(false)
        try {
            const mailRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/mails/verification", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials : 'include',
            })
            setEnableButton(true)
            setShowResendMessage(true)
        }
        catch (err) {
            setEnableButton(true)
        }
        
       
    }

    if (isLoading) {
        return <LoadingPage />
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
                <div className="w-full flex justify-center text-center whitespace-pre-wrap">Please verify your account in mailbox. The mail had been sent to <span className="text-indigo-700 font-bold">{currentUser?.email}</span></div>
                <div className="w-full flex justify-center text-center whitespace-pre-wrap">If you did not receive mail, click the button to resend.</div>
                <div className="w-full flex justify-center">
                    {
                        enableButton 
                        ? <button onClick={resendMail} className="primary-button">Resend</button>
                        : <button className="disabled-button" disabled>Resend</button>
                    }
                    
                </div>
                <div className="w-full flex justify-center text-center whitespace-pre-wrap">
                    {
                        showResendMessage && <span className="text-slate-700 text-sm">The mail had been resent</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default MailVerifyPage