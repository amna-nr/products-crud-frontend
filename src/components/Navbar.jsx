import { Link, useNavigate } from "react-router-dom";
import api from '../api/axios'
import Button from "./Button";
import { useState } from "react";
import Cart from "./Cart";
import ErrorDialog from "./ErrorDialog";

function Navbar (){
    let navigate = useNavigate()
    const [isOpenCart, setIsOpenCart] = useState(false)
    const [error, setError] = useState("")

    const logoutUser = async () => {
        try {
        await api.post("/auth/logout", {})
        navigate("/login")
        } catch (err) {
            setError(err.response.data.detail)
        }
    }

    return (
        <>
        <nav className="fixed top-0 flex justify-between bg-blue-950 min-w-screen">
            <Button text="✛" onClick={() => {navigate("/products/create")}} />
            <div className="px-2">
            <Button text="Cart" onClick={() => {setIsOpenCart(!isOpenCart)}}/>
            <Button text="Logout" onClick={logoutUser} />
            </div>
        </nav>
        {isOpenCart&&
            <Cart setIsOpenCart={setIsOpenCart} />
        }
        {error && 
            <ErrorDialog error={error} onClose={() => {setError("")}} className="mt-40"/>
        }
        </>
    )
}

export default Navbar;