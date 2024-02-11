export default function SettingPage(){
    return (<div className="page justify-center bg-indigo-50">
        <div className="border-2 border-blue-200 rounded-lg flex flex-col w-3/4 from-sky-300 to-red-300 bg-gradient-to-b">
            <div className="text-center text-lg font-bold">
                Setting
            </div>
            <button className="white-button">Change Email Account</button>
            <button className="primary-button">Change Password Account</button>
            <button className="danger-button">Remove Account</button>
        </div>
    </div>)
}