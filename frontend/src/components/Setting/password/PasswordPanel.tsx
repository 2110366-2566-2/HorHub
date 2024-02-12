export default function PasswordPanel() {
    
    return ( <div className="flex flex-col w-full">
    
    
    <div className="border-b border-slate-500 my-2 font-bold text-left">Change your password</div>
    <form className="flex flex-col "  >  
    <div className="flex flex-col gap-y-2 w-full">
    <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-semibold">Old Password</span>
            </div>
            <input 
                type="text"
                placeholder="enter your old password" 
                className={"input input-bordered input-sm w-full max-w-xs bg-white "}
               />

    </label>
    <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-semibold">New Password</span>
            </div>
            <input 
                type="text"
                placeholder="enter your new password" 
                className={"input input-bordered input-sm w-full max-w-xs bg-white "}
               />
    </label>
    <button className="primary-button w-fit" type="submit">Change Password</button>
    </div>
    </form >
    </div>);
}