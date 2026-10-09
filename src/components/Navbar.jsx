import { Link, useNavigate } from "react-router-dom";
import api from '../api/axios'
import Button from "./Button";
import { useState } from "react";
import Cart from "./Cart";

function Navbar (){
    let navigate = useNavigate()
    const [isOpenCart, setIsOpenCart] = useState(false)

    const logoutUser = async () => {
        const response = await api.post("/auth/logout", {})
        navigate("/login")
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
        </>
    )
}

export default Navbar;