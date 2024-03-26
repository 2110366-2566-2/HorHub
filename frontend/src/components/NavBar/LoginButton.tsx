import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../../lib/context/UserContext"

const LoginButton = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isError, setError] = useState<boolean>(false)

    const {currentUser,fetchUser} = useUser();
    
    const navigate = useNavigate();

    const onClick = async() => {
        setError(false)
        const result = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/login',{
            method : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({
                email : email,
                password : password
            }),
            credentials : 'include',
        });
        if (result.status === 200){
            const res = await result.json();
            console.log(res.token);
            fetchUser();
            setEmail("");
            setPassword("");
            navigate("../",{replace : true});
        }
        else {
            setError(true)
        }
    }


    return (
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="primary-button">Sign In</div>
        <div tabIndex={0} className="dropdown-content z-[20] menu py-4 px-4 shadow bg-white rounded-box w-80 -bottom-2 translate-y-full border border-slate-100">
            <form className="w-full flex flex-col items-center gap-3" onSubmit={(e) => {e.preventDefault(); onClick();}}>
                <span className="font-semibold text-base">Sign In</span>
                {
                    isError && <div className="flex w-full justify-center text-red-700">Email or password is wrong!</div>
                }
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
                    ? <button type="submit" className="primary-button">Sign In</button>
                    : <button className="disabled-button" disabled>Sign In</button>
                }
            </form>
        </div>
    </div>
  )
}

export default LoginButton