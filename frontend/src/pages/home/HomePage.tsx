import { useEffect } from "react";
import getUser from "../../lib/getUser";
import buildingSVG from "../../res/svg/homebuilding.svg"
import { useUser } from "../../lib/context/UserContext";

function HomePage() {
    const {currentUser, fetchUser} = useUser();

    useEffect(() => {
        document.title = 'Home | HorHub'
    }, [])
    
    return (
        <div className="unpadding-page">
            <div className="flex w-full h-[calc(100vh-4rem)] bg-indigo-50">
                <div className="flex flex-col w-full md:w-[50%] h-full justify-center items-center gap-5">
                    <span className="font-bold text-3xl">Welcome to <span className="bg-gradient-to-r from-sky-600 to-indigo-700 bg-clip-text text-transparent">HorHub!</span></span>
                    <span className="font-semibold text-2xl">The best hub to find hor</span>
                </div>
                <div className="hidden md:flex flex-col w-[50%] h-full justify-center items-center gap-5">
                    <img src={buildingSVG} />
                </div>
            </div>
        </div>
    )
}

export default HomePage
