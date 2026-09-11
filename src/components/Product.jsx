import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";


function Product() {
    const [product, setProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [isOpenDialog, setIsOpenDialog] = useState(false);

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

    const deleteProduct = async () => {
        const response = await api.delete(`/products/${id}`)
        navigate("/products")
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col justify-center items-end rounded border p-2" key={product.id}>

                {!isOpenDialog &&
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
                                <button onClick={() => {setIsOpenDialog(!isOpenDialog)}}> 
                                    Delete 
                                </button>
                            </div>
                        }
                    </div>
                }

                {isOpenDialog? 
                (
                    <dialog open
                    className="flex flex-col rounded border p-2 gap-2 mx-auto">
                        <p> 
                            Delete {product.name} from products? 
                        </p>
                        <div className="flex justify-center">
                            <button className="bg-blue-200 rounded border p-1 m-1"
                            onClick={() => {setIsOpenDialog(!isOpenDialog)}}>
                                Cancel 
                            </button>
                            <button className="bg-red-400 rounded border p-1 m-1"
                            onClick={deleteProduct}> 
                                Okay 
                            </button>
                        </div>
                    </dialog>
                ):
                    (!isEditing? 
                    (
                        <div onClick={() => {
                            setIsOpen(!isOpen)
                            setIsOpenDialog(false)
                        }}>
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <p>{product.quantity}</p>
                            <button className="rounded border p-2 bg-green-200"> Add to cart</button>
                        </div>
                    ):
                    (   <form className="flex flex-col justify-center items-center p-2"
                        onClick={() => {
                            setIsOpen(!isOpen)
                            setIsOpenDialog(false)
                        }}
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
                )}
            </div>
        </div>
    )  
}

export default Product;
