import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
        <div key={product.id} product={product}
             className="flex flex-col items-center rounded border m-4 p-2"
             onClick={() => {navigate(`${product.id}`)}}
        >
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>in stock: {product.quantity}</p>
            <button className="rounded border bg-green-200 p-2">
                Add to cart
            </button>
        </div>
      ))}
    </div>
    )
}

export default Products;