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
        <form className="flex flex-col rounded border border-0 bg-slate-300 pt-6 p-2">
            <input className="focus:outline-none focus:ring-0 rounded border border-0 bg-white p-2 m-1"
            placeholder="name" value={name} onChange={(e) => {setName(e.target.value)}}></input>
            <input className="focus:outline-none focus:ring-0 rounded border border-0 bg-white p-2 m-1"
            placeholder="price" value={price} onChange={(e) => {setPrice(e.target.value)}}></input>
            <input className="focus:outline-none focus:ring-0 rounded border border-0 bg-white p-2 m-1"
            placeholder="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}></input>
            <div className="flex justify-around p-2">
                <button className="rounded border border-0 bg-blue-950 text-white p-2 px-4 m-2 mx-auto"
                onClick={() => navigate("/products")}> 
                Cancel
                </button>
                <button className="rounded border border-0 bg-blue-950 text-white p-2 px-5 m-2 mx-auto"
                type="submit" onClick={createProduct}> 
                Save 
                </button>
            </div>
        </form>
        </div>
    )
} 

export default ProductCreate;