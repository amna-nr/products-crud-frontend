import { useState } from "react";
import api from '../api/axios.jsx';


function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = async (e) => {
        e.preventDefault()
        const response = await api.post("/auth/login",
            {
                email: email,
                password: password
            }
        )
        setEmail("")
        setPassword("")
    }

    return (
        <form className="flex flex-col items-center justify-center min-h-screen"
        onSubmit={loginUser}>
            <input value={email} placeholder="email"
            className="p-2 m-1 rounded border"
            onChange={e => {setEmail(e.target.value)}}>
            </input>
             <input value={password} placeholder="password"
            className="p-2 m-1 rounded border"
            onChange={e => {setPassword(e.target.value)}}>
            </input>
            <button className="p-2 m-1 rounded border"
             type="submit">Login</button>
        </form>
    )
}

export default LoginForm;