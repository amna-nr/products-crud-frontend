import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios.jsx';
import { Link } from "react-router-dom";


function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate();

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

        navigate("/")

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form className="flex flex-col items-center"
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
            <p>
                Don't have an account? Register <Link className="text-indigo-600" to="/register">Here</Link>
            </p>
        </div>
    )
}

export default LoginForm;