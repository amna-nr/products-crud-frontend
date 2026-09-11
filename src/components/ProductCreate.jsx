import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


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
        <form className="flex flex-col rounded border p-2">
            <div className="flex justify-end">
                <button className="rounded border bg-red-400 p-2 py-1 m-1"
                onClick={() => {navigate("/products")}}> 
                    X 
                </button>
            </div>
            <input className="rounded border p-2 m-1"
            placeholder="name" value={name} onChange={(e) => {setName(e.target.value)}}></input>
            <input className="rounded border p-2 m-1"
            placeholder="price" value={price} onChange={(e) => {setPrice(e.target.value)}}></input>
            <input className="rounded border p-2 m-1"
            placeholder="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}></input>
            <button className="rounded border bg-green-200 p-2 px-4 m-1 mx-auto"
            type="submit" onClick={createProduct}> 
            Save 
            </button>
        </form>
        </div>
    )
} 

export default ProductCreate;