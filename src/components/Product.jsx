import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";


function Product() {
    const [product, setProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const { id } = useParams();
    let navigate = useNavigate();

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
    
    const updateProduct = async(e) => {
        e.preventDefault()
        const response = await api.put(`/products/${id}`,
            {
                name: name,
                price: parseInt(price, 10),
                quantity: parseInt(quantity, 10)
            }
        )
        setProduct(response.data)
        setIsEditing(!isEditing)
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col items-end rounded border p-2" key={product.id}>
                <div className="relative">
                    <button onClick={() => {setIsOpen(!isOpen)}}> ⋮ </button>
                    {isOpen && 
                    <div className="flex flex-col items-start border p-2 absolute bg-white">
                        <button onClick={() => {
                            setIsEditing(!isEditing) 
                            setName(product.name)
                            setPrice(product.price)
                            setQuantity(product.quantity)
                        }}> 
                            Edit 
                        </button>
                        <button> Delete </button>
                    </div>
                    }
                </div>
                {!isEditing? (
                <div onClick={() => {setIsOpen(!isOpen)}}>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                    <button className="rounded border p-2"> Add to cart</button>
                </div>
                ) :
                (<form className="flex flex-col justify-center items-center p-2"
                onClick={() => {setIsOpen(!isOpen)}}
                onSubmit={updateProduct}>
                    <input className="rounded border p-2 m-1"
                    value={name} onChange={(e) => {setName(e.target.value)}}/>
                    <input className="rounded border p-2 m-1"
                    value={price} onChange={(e) => {setPrice(e.target.value)}} />
                    <input className="rounded border p-2 m-1"
                    value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
                    <button className="rounded border p-2 m-1" type="submit">Save</button>
                </form>
                )
                }
            </div>
        </div>
    )  
}

export default Product;
