import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import ErrorDialog from "./ErrorDialog";


function ProductCreate() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState("")

    let navigate = useNavigate()

    const createProduct = async (e) => {
        try {
           e.preventDefault()
            const response = await api.post("/products", 
                {
                    name: name,
                    price: parseInt(price, 10),
                    stock_quantity: parseInt(quantity, 10)
                }
            )
            let id = response.data.id
            navigate(`/products/${id}`) 
        } catch (err) {
            setError(err.response.data.detail)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
        {error &&
            <dialog open
            className="flex flex-col items-end rounded border border-0 shadow-2xl p-4 gap-2 mx-auto z-10">
                <Button text="X" onClick={() => {setError("")}} />
                <p className="text-red-600 px-16 p-6 mb-10">{error}</p>
            </dialog>
        }
        <form className="flex flex-col">
            <Input placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}} />
            <Input placeholder="Price" value={price} onChange={(e) => {setPrice(e.target.value)}} />
            <Input placeholder="Quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
            <div className="flex justify-around p-2">
                <Button text="Cancel" onClick={() => navigate("/products")} />
                <Button text="Save" onClick={createProduct}/>
            </div>
        </form>
        </div>
    )
} 

export default ProductCreate;