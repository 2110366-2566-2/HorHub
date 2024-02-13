import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ImCross } from "react-icons/im";

function FailVerifyPopup(){
    
    useEffect(() => {
        document.title = 'Verifying Account | HorHub'
    }, [])

    return (
        <div className="page w-screen items-center h-screen justify-center fixed top-0 bg-gray-800 bg-opacity-70 z-50">
            <div className="max-w-3xl mx-auto flex flex-col rounded-xl border border-blue-500 p-5 gap-5 bg-white">
                <div className="flex items-center justify-center">
                    <div className="border-4 border-gray-600 rounded-full h-20 w-20 flex items-center justify-center">
                        <ImCross className="animate-checkmark text-4xl text-red-700"/>
                    </div>
                </div>
                <div className="w-full text-center font-bold text-red-700 text-3xl">
                    Verification Fail
                </div>
                <div className="w-full flex justify-start text-center font-bold text-indigo-700 text-xl">
                    We're sorry, but we couldn't verify your email.
                </div>
                <div className="flex">
                    <Link to="/register" className="flex primary-button ml-2">Return to Register Page</Link>
                    <div className="flex ml-auto">
                        <Link to="/" className="flex primary-button ml-2">Return to Homepage</Link>
                    </div>                      
                </div>
            </div>
        </div>
    )
    
    
}

export default FailVerifyPopup