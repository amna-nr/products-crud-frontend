import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Products () {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    async function getProducts() {
        const response = await api.get("/products/");
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts();
    }, []);
    
    return (
        <div className="bg-ivory">
        <Navbar />
        <button className="flex mx-auto text-3xl bg-gray-200 text-gray-600 rounded border  px-32 mt-6"
        onClick={() => {navigate("/products/create")}}>
            +
        </button>
        <div className="grid grid-cols-3 gap-12 m-2 mx-8">
        {products.map((product) => (
        <div key={product.id} product={product}
             className="flex flex-col items-center bg-slate-300 rounded-lg m-4 p-4"
             onClick={() => {navigate(`${product.id}`)}}
        >
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>in stock: {product.quantity}</p>
            <button className="rounded border border-gray-600 bg-blue-950 text-white p-2 m-2 mt-4">
                Add to cart
            </button>
        </div>
      ))}
    </div>
    </div>
    )
}

export default Products;