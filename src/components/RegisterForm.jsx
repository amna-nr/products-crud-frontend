import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import api from '../api/axios.jsx'
import Input from "./Input.jsx";
import Button from "./Button.jsx";


function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    let navigate = useNavigate();


    const registerUser = async (e) => {
        try {
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
        } catch (err) {
            setError(err.response.data.detail)
        }
    }

    return (
        <div  className="flex flex-col items-center justify-center min-h-screen">
        <form className="flex flex-col items-center"
        onSubmit={registerUser}>
            <Input placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} />
            <Input placeholder="Password" value={password} onChange={e => {setPassword(e.target.value)}} />
            <Input placeholder="Confirm password" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}} />
            <Button text="Register" type="submit" />
        </form>
        {error && 
            <p className="text-red-600">{error}</p>}
        <p className="p-4">
            Already have an account? Login <Link className="text-indigo-600" to="/login">Here</Link>
        </p>
        </div>
    );
}


export default RegisterForm;