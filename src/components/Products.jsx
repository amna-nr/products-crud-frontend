import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Products () {
    const [products, setProducts] = useState([]);
    const [imageUrls, setImageUrls] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function getProducts() {
        try {
            const response = await api.get("/products/");
            setProducts(response.data);
        } catch (err) {
            setError(err.response.data.detail)
        }
    }

    const getImageUrls = async () => {
        try {
            const images = await Promise.all(products.map(async (product) => {
                const response = await api.get(`/images/${product.name}`)
                return response.data
            }))
            setImageUrls(images)
        } catch (err) {
            setError(err.response.data.detail)
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        getImageUrls();
    }, [products])

    return (
        <div className="py-20 bg-gray-100 relative">
        <Navbar />
        {error &&
            <ErrorDialog error={error} onClose={() => {setError("")}}/>
        }
        <div className="grid grid-cols-4 gap-12 m-2 mx-8">
        {products.map((product, index) => (
        <div key={product.id}
             className="flex flex-col items-start bg-white shadow-2xl m-1 p-4"
             onClick={() => {navigate(`${product.id}`)}}
        >   
            <img className="w-60 h-60 object-cover"
            src={imageUrls[index]}></img>
            <p>{product.name}</p>
            <p className="text-blue-950"
            >Rs. {product.price}</p>
            <p>In stock: {product.stock_quantity}</p>
        </div>
      ))}
    </div>
    </div>
    )
}

export default Products;