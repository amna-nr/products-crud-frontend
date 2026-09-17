import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";


function ProductCreate() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    let navigate = useNavigate()

    const createProduct = async (e) => {
        e.preventDefault()
        const response = await api.post("/products", 
            {
                name: name,
                price: parseInt(price, 10),
                quantity: parseInt(quantity, 10)
            }
        )
        let id = response.data.id
        navigate(`/products/${id}`)
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
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