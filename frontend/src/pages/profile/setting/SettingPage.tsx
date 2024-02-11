export default function SettingPage(){
    return (<div className="page justify-center">
        <div className="border-2 border-blue-200 rounded-lg flex flex-col w-3/4">
            <div className="text-center text-lg font-bold">
                Setting
            </div>
            <button className="primary-button">Change Password Account</button>
            <button className="danger-button">Remove Account</button>
        </div>
    </div>)
}