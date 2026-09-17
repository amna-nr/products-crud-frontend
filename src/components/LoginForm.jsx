import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios.jsx';
import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import Input from "./Input.jsx";

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

        navigate("/products")

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form className="flex flex-col items-center p-4"
            onSubmit={loginUser}>
                <Input placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} />
                <Input placeholder="Password" value={password} onChange={e => {setPassword(e.target.value)}} />
                <Button text="Login" type="submit"/>
            </form>
            <p className="p-4">
                Don't have an account? Register <Link className="text-indigo-600" to="/register">Here</Link>
            </p>
        </div>
    )
}

export default LoginForm;