import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import api from '../api/axios.jsx'

function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    let navigate = useNavigate();


    const registerUser = async (e) => {
        e.preventDefault()
        const response = await api.post("/auth/register",
            {
                email: email,
                password: password,
                confirm_password: confirmPassword
            }
        )
        setEmail("")
        setPassword("")
        setConfirmPassword("")

        navigate("/login")
    }

    return (
        <div  className="flex flex-col items-center justify-center min-h-screen">
        <form className="flex flex-col items-center"
        onSubmit={registerUser}>
            <input className="p-2 m-1 rounded border"
            value={email} placeholder="email" 
            onChange={e => {setEmail(e.target.value)}}></input>
            <input className="p-2 m-1 rounded border"
            value={password} placeholder="password" 
            onChange={e => {setPassword(e.target.value)}}></input>
            <input className="p-2 m-1 rounded border"
            value={confirmPassword} placeholder="confirm password" 
            onChange={e => {setConfirmPassword(e.target.value)}}></input>
            <button className="p-2 m-1 rounded border"
            type="submit" > Register </button>
        </form>
        <p>
            Already have an account? Login <Link className="text-indigo-600" to="/login">Here</Link>
        </p>
        </div>
    );
}


export default RegisterForm;