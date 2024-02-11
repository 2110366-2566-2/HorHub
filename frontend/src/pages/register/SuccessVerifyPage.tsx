import { Link } from "react-router-dom"

function SuccessVerifyPage() {
    return (
        <div className="page justify-center">
            <div className="w-4/5 flex flex-col rounded-xl border border-blue-500 p-5 gap-3">
                <div className="w-full text-center font-bold text-lg">
                    Verifying Account
                </div>
                <div className="w-full flex justify-center text-center whitespace-pre-wrap">Your account is verified successfully. Welcome to <span className="text-indigo-700 font-bold">HorHub</span></div>
                <div className="w-full flex justify-center text-center whitespace-pre-wrap">Get start with this platform by exploring our homepage</div>
                <div className="w-full flex justify-center">
                    <Link to="/" className="primary-button">Let's Go!</Link>                    
                </div>
            </div>
        </div>
    )
}

export default SuccessVerifyPage