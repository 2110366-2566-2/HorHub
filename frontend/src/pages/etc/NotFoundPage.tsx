import { useEffect } from "react"
import Graph404 from "../../res/img/404-img.png"

function NotFoundPage() {

    useEffect(() => {
        document.title = "Page not found | HorHub"
    }, [])

    return (
        <div className="page justify-center">
            <div className="flex flex-col justify-center items-center gap-3">
                <span className="text-2xl font-bold text-indigo-600 text-center">404 - Page not found</span>
                <span className="text-lg font-semibold text-center">Much like y'(0) in the function below, this page is undefined!</span>
                <img src={Graph404} />
                <button 
                    className="primary-button"
                    onClick={() => document.location.href = "/"}>
                    Go to homepage
                </button>
            </div>
        </div>
    )
    
}

export default NotFoundPage