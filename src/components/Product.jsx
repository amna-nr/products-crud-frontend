import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

import Button from "./Button";
import Cart from "./Cart";
import ErrorDialog from "./ErrorDialog";

function Product() {
    const [product, setProduct] = useState(null);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null)

    const [error, setError] = useState("")

    const { id } = useParams();
    let navigate = useNavigate();

    const getProduct = async() => {
        try {
            const response =  await api.get(`/products/${id}`)
            setProduct(response.data)
            setEditedProduct(response.data)
        } catch (err) {
            setError(err.response.data.detail)
        }
    }

    const getImage = async () => {
        try {
            const response = await api.get(`/images/${product.name}`)
            setImageUrl(response.data)
        } catch (err) {
            setError(err.response.data.detail)
        }
    }

    const addToCart = async () => {
        try {
            const response = await api.post("/cart", 
                {
                    id: parseInt(product.id),
                    quantity: parseInt(quantity)
                }
            );
            setIsOpenCart(true);
            getProduct();
            setQuantity(1);
        } catch (err) {
            setError(err.response.data.detail)
        }
        
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
        try {
            e.preventDefault()
            const response = await api.put(`/products/${id}`,
                {
                    name: editedProduct.name,
                    price: parseInt(editedProduct.price, 10),
                    stock_quantity: parseInt(editedProduct.stock_quantity, 10)
                }
            )
            setProduct(response.data)
            setIsEditing(!isEditing)
        } catch (error) {
            setError(error.response.data.detail)
        }
    }

    const deleteProduct = async () => {
        try {
            const response = await api.delete(`/products/${id}`)
            navigate("/products")
        }
        catch (error) {
            setError(error.response.data.detail)
        }
    }

    return(
        <div className="flex items-center justify-end bg-gray-100 min-h-screen">
            <div className="flex flex-col justify-center bg-white items-end px-8 pb-16 m-16 shadow-lg fixed left-0 top-0" key={product.id}>
                {error &&
                <ErrorDialog error={error} onClose={() => {setError("")}}/>
                }
                {!isOpenDelete &&
                    <div className="relative">
                        <button className="text-3xl p-4"
                        onClick={() => {setIsOpenMenu(!isOpenMenu)}}> ⋮ </button>
                        {isOpenMenu && 
                            <div className="flex flex-col items-start p-0 absolute">
                                <Button text="Delete" onClick={() => {setIsOpenDelete(!isOpenDelete)}} />
                            </div>
                        }
                    </div>
                }

                {isOpenDelete &&
                (
                    <dialog open
                    className="flex flex-col rounded border border-0 shadow-2xl p-4 gap-2 mx-auto">
                        <p className="p-4"> 
                            Delete {product.name} from products? 
                        </p>
                        <div className="flex justify-center">
                            <Button text="Cancel" onClick={() => {setIsOpenDelete(!isOpenDelete)}} />
                            <Button text="Okay" onClick={deleteProduct} />
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
                    value={editedProduct.name} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                    onChange={(e) => {setEditedProduct({...editedProduct, name: e.target.value})}}></input>
                    <input className="focus:outline-none focus:ring-0 p-1"
                    value={editedProduct.price} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                    onChange={(e) => {setEditedProduct({...editedProduct, price: e.target.value})}}></input>
                    <input className="focus:outline-none focus:ring-0 p-1 mb-auto"
                        value={editedProduct.stock_quantity} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                        onChange={(e) => {setEditedProduct({...editedProduct, stock_quantity: e.target.value})}}></input>
                    {product.stock_quantity == 0&& (
                        <p className="text-red-600 mx-auto p-8"
                        >Out of stock</p>
                    )}     
                    {isEditing&&
                    <div className="flex justify-around">
                        <Button text="Cancel" onClick={() => {setIsEditing(false); getProduct();}} />
                        <Button text="Save" onClick={updateProduct} type="submit"/>
                    </div>
                    }     
                    {!isEditing&& product.stock_quantity > 0 &&
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
                            if (quantity < product.stock_quantity){
                                setQuantity(quantity + 1)
                            }
                        }}/>
                    </div>
                    <Button text="Add to cart" 
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart();
                    }} />
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
