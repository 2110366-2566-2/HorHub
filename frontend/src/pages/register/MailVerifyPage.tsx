import { useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext"
import { useEffect, useState } from "react";
import LoadingPage from "../etc/LoadingPage";
import FailVerifyPopup from "./FailVerifyPopup";
import { RiMailSendFill } from "react-icons/ri";

function MailVerifyPage() {

    const navigate = useNavigate();

    const {currentUser, isLoading} = useUser()

    const [enableButton, setEnableButton] = useState<boolean>(true)
    const [showResendMessage, setShowResendMessage] = useState<boolean>(false)

    // 10 minutes countdown
    const countdownTime = 10 * 60 * 1000; 
    const [timeRemaining, setTimeRemaining] = useState<number>(countdownTime);
  
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    //timeout 
    const [isTimeout, setIsTimeout] = useState(false);


    useEffect(() => {
        document.title = 'Verifying Account | HorHub'
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
              const newTime = prevTime - 1000;
              if (newTime < 0) {
                  setIsTimeout(true); 
                  clearInterval(timer); 
                  return 0; 
              } else {
                  return newTime; 
              }
              });
          }, 1000);
      
          return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        if (isTimeout) {
            console.log("Delete account!")
            fetch(process.env.REACT_APP_BACKEND_URL + "/auth/verify/fail", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials : 'include',
            }).then(async (res) => {return res.json()})
            .then((data) => {
                if (data.message === "Verify Successful") {
                    
                    document.location = '/verify/success'
                }
            })
        }
    }, [isTimeout])

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
            setTimeRemaining(countdownTime)
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
        <div className="page justify-start">
            <div className="max-w-3xl mx-auto flex flex-col rounded-xl border border-blue-500 p-5 gap-5">
                <div className="flex items-center justify-center">
                    <div className="border-4 border-gray-600 rounded-full h-20 w-20 flex items-center justify-center">
                        <RiMailSendFill className="animate-mail text-4xl text-blue-600"/>
                    </div>
                </div>
                <div className="w-full text-center font-bold text-3xl">
                    Verifying Account
                </div>
                <div className="w-full flex justify-start text-center whitespace-pre-wrap text-lg">
                    Hello <span className="text-indigo-700 font-bold">{currentUser?.displayName}</span>,
                </div>
                <div className="w-full flex justify-start text-center whitespace-pre-wrap text-lg">
                    You must verify your email in <span className="text-green-800">{minutes} m {seconds} s</span>.
                </div>
                <div className="w-full flex justify-start text-center whitespace-pre-wrap text-lg">
                    We've already sent a verification message to <span className="text-indigo-700 font-bold">{currentUser?.email}</span>. 
                </div>
                <div className="w-full flex justify-start text-center whitespace-pre-wrap text-lg">
                    You can simply click the link in order to verify your account.
                </div>
                <div className="w-full flex justify-start text-center whitespace-pre-wrap text-lg">
                    In case that you don't see the message, you may need to check your spam folder.
                </div>
                <div className="w-full flex justify-start text-sm">
                    Still can't find the email? No problem. Click&nbsp;{enableButton ? <button onClick={resendMail} className="text-indigo-700 font-bold">here</button> : <button className="text-slate-700 font-bold">here</button>}&nbsp;to resend the email.
                </div>
                <div className="w-full flex justify-center text-center whitespace-pre-wrap">
                    {
                        showResendMessage && <span className="text-slate-700 text-xs">email had been resent</span>
                    }
                </div>
            </div>
            {isTimeout && (<FailVerifyPopup/>)}
        </div>
    )
}

export default MailVerifyPage