export default function DeletePanel() {
    
    return ( <div className="flex flex-col w-full">
    
    
    <div className="border-b border-slate-500 my-2 font-bold text-left">Delete your email</div>
    <form className="flex flex-col "  >  
    <div className="flex flex-col gap-y-2 w-full">
    <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text font-semibold">Password</span>
            </div>
            <input 
                type="text"
                placeholder="enter your password" 
                className={"input input-bordered input-sm w-full max-w-xs bg-white "}
               />

    </label>
    <button className="danger-button w-fit" type="submit">Delete account</button>
    </div>
    </form >
    </div>);
}