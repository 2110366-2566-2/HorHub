import { useState } from "react"
import { Link } from "react-router-dom"

const LoginButton = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    return (
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="primary-button">Sign In</div>
        <div tabIndex={0} className="dropdown-content z-[20] menu py-4 px-4 shadow bg-white rounded-box w-80 -bottom-2 translate-y-full border border-slate-100">
            <div className="w-full flex flex-col items-center gap-3">
                <span className="font-semibold text-base">Sign In</span>
                <div className="w-full flex flex-col gap-2">
                    <label className="text-base">Email</label>
                    <input 
                        type="text" 
                        placeholder="Email..." 
                        className="input input-bordered input-sm w-full max-w-xs" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label className="text-base">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password..." 
                        className="input input-bordered input-sm w-full max-w-xs" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <span>Don't have an account? <Link to="/register">Sign up</Link> now!</span>
                {
                    (email && password) 
                    ? <button className="primary-button">Sign In</button>
                    : <button className="disabled-button" disabled>Sign In</button>
                }
            </div>
        </div>
    </div>
  )
}

export default LoginButton