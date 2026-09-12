import { Link, useNavigate } from "react-router-dom";
import api from '../api/axios'

function Navbar (){
    let navigate = useNavigate()

    const logoutUser = async (e) => {
        e.preventDefault()
        const response = await api.post("/auth/logout", {})

        navigate("/login")
    }

    return (
        <nav className="flex justify-end p-2 pr-4 bg-blue-950">
            <button className="text-white p-2"
            onClick={logoutUser}
            type="submit">Logout</button>
        </nav>
    )
}

export default Navbar;