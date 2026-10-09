import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Products () {
    const [products, setProducts] = useState([]);
    const [imageUrls, setImageUrls] = useState([])
    const navigate = useNavigate()

    async function getProducts() {
        const response = await api.get("/products/");
        setProducts(response.data);
    }

    const getImageUrls = async () => {
        const images = await Promise.all(products.map(async (product) => {
            const response = await api.get(`/images/${product.name}`)
            return response.data
        }))
    setImageUrls(images)
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
        <div className="grid grid-cols-4 gap-12 m-2 mx-8">
        {products.map((product, index) => (
        <div key={product.id}
             className="flex flex-col items-start bg-white shadow-lg m-1 p-4"
             onClick={() => {navigate(`${product.id}`)}}
        >   
            <img className="w-60 h-60 object-cover"
            src={imageUrls[index]}></img>
            <p>{product.name}</p>
            <p className="text-blue-950"
            >Rs. {product.price}</p>
            <p>In stock: {product.quantity}</p>
        </div>
      ))}
    </div>
    </div>
    )
}

export default Products;