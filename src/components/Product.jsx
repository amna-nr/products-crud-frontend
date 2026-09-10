import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";


function Product() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    const getProduct = async() => {
        const response =  await api.get(`/products/${id}`)
        setProduct(response.data) 
    }

    useEffect(() => {
        getProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-center rounded border p-2"
            key={product.id}>
                <p
                >{product.name}</p>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
                <button className="rounded border p-2"
                >Add to cart</button>
            </div>
        </div>
    )
    
}


export default Product;