import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

import Button from "./Button";
import Cart from "./Cart";

function Product() {
    const [product, setProduct] = useState(null);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isOpenCart, setIsOpenCart] = useState(false);

    const { id } = useParams();
    let navigate = useNavigate();

    const getProduct = async() => {
        const response =  await api.get(`/products/${id}`)
        setProduct(response.data) 
    }

    const getImage = async () => {
        const response = await api.get(`/images/${product.name}`)
        setImageUrl(response.data)
    }

    const addToCart = async () => {
        const response = await api.post("/cart", 
           {
            id: parseInt(product.id),
            quantity: parseInt(quantity)
           }
        );
        setIsOpenCart(true);
    }

    useEffect(() => {
        getProduct();
    }, [id]);

    useEffect(() => {
        if (product)
        {
            getImage()
        }
    }, [product]);
    
    if (!product) {
        return <p>Loading...</p>;
    }
    
    const updateProduct = async(e) => {
        e.preventDefault()
        const response = await api.put(`/products/${id}`,
            {
                name: product.name,
                price: parseInt(product.price, 10),
                quantity: parseInt(product.quantity, 10)
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
        <div className="flex items-center justify-end bg-gray-100 min-h-screen">
            <div className="flex flex-col justify-center bg-white items-end px-8 pb-16 m-16 shadow-lg fixed left-0 top-0" key={product.id}>

                {!isOpenDelete &&
                    <div className="relative">
                        <button className="text-3xl p-4"
                        onClick={() => {setIsOpenMenu(!isOpenMenu)}}> ⋮ </button>
                        {isOpenMenu && 
                            <div className="flex flex-col items-start border p-2 absolute bg-white">
                                <button onClick={() => {setIsOpenDelete(!isOpenDelete)}}> 
                                    Delete 
                                </button>
                            </div>
                        }
                    </div>
                }

                {isOpenDelete &&
                (
                    <dialog open
                    className="flex flex-col rounded border p-2 gap-2 mx-auto">
                        <p> 
                            Delete {product.name} from products? 
                        </p>
                        <div className="flex justify-center">
                            <button className="bg-blue-200 rounded border p-2 m-1"
                            onClick={() => {setIsOpenDelete(!isOpenDelete)}}>
                                Cancel 
                            </button>
                            <button className="bg-red-400 rounded border p-2 m-1"
                            onClick={deleteProduct}> 
                                Okay 
                            </button>
                        </div>
                    </dialog>
                )}
                    
                <div className="flex p-4"
                onClick={() => {
                        setIsOpenMenu(false)
                        setIsOpenDelete(false)
                        setIsEditing(false)
                    }}>
                    {imageUrl&&
                    <img className="w-100 h-80 object-cover"
                    src={imageUrl}></img>
                    }
                    <div className="flex flex-col p-4 pl-8 pb-0">
                    <input className="focus:outline-none focus:ring-0 p-1"
                    value={product.name} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                    onChange={(e) => {setProduct({...product, name: e.target.value})}}></input>
                    <input className="focus:outline-none focus:ring-0 p-1"
                    value={product.price} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                    onChange={(e) => {setProduct({...product, price: e.target.value})}}></input>
                    <input className="focus:outline-none focus:ring-0 p-1 mb-auto"
                    value={product.quantity} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                    onChange={(e) => {setProduct({...product, quantity: e.target.value})}}></input>
                    {isEditing&&
                    <div className="flex justify-around">
                        <Button text="Cancel" onClick={() => {setIsEditing(false)}} />
                        <Button text="Save" onClick={updateProduct} type="submit"/>
                    </div>
                    }     
                    {!isEditing&& 
                    <div className="flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Button
                        text="-" 
                        onClick={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1)
                            }   
                        }}/>
                        <Button text={quantity}/>
                        <Button text="+" onClick={() => {
                            if (quantity < product.quantity){
                                setQuantity(quantity + 1)
                            }
                        }}/>
                    </div>
                    <Button text="Add to cart" onClick={(e) => {e.stopPropagation(); addToCart()}} />
                    </div>
                    }
                    </div>  
                </div>
            </div>
            {isOpenCart&&
            <Cart setIsOpenCart={setIsOpenCart} />
    }
        </div>
    )  
}

export default Product;
