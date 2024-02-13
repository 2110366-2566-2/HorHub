import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ImCheckmark } from "react-icons/im";

function SuccessVerifyPage() {

    useEffect(() => {
        document.title = 'Verifying Account | HorHub'
    }, [])

    return (
        <div className="page justify-start">
            <div className="max-w-3xl mx-auto flex flex-col rounded-xl border border-blue-500 p-5 gap-5">
                <div className="flex items-center justify-center">
                    <div className="border-4 border-gray-600 rounded-full h-20 w-20 flex items-center justify-center">
                        <ImCheckmark className="animate-checkmark text-4xl text-blue-600"/>
                    </div>
                </div>
                <div className="w-full text-center font-bold text-indigo-700 text-3xl">
                    Verification success
                </div>
                <div className="w-full flex justify-start text-center font-bold text-indigo-700 text-xl">
                    Congratulations!
                </div>
                <div className="w-full flex justify-start text-center whitespace-pre-wrap">
                    Your account is verified successfully. Welcome to <span className="text-indigo-700 font-bold">HorHub</span>
                </div>
                <div className="w-full flex justify-start text-center whitespace-pre-wrap">   
                    You can now enjoy full access to all the features of our platform.
                </div>
                <div className="w-full flex justify-start text-center whitespace-pre-wrap">
                    Get start with this platform by exploring our homepage
                </div>
                <div className="w-full flex justify-center">
                    <Link to="/" className="primary-button ml-2">Return to Homepage</Link>                     
                </div>
            </div>
        </div>
    )
}

export default SuccessVerifyPage