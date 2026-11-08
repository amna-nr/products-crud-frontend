import api from "../api/axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";

function Cart({setIsOpenCart}) {
    const [cart, setCart] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const [accessError, setAccessError] = useState("");
    const [editedQuantityId, setEditedQuantityId] = useState("");
    const [checkoutError, setCheckoutError] = useState("")

    let navigate = useNavigate();
    const getCart = async () => {
        try {
            const response = await api.get("/cart")
            setCart(response.data)
            setError("")

            const imageUrls = await Promise.all( response.data.map(async (cartItem) => {
            const result = await api.get(`/images/${cartItem.product.name}`)
            return result.data
            }))
            setImageUrls(imageUrls)
        } catch (err) {
            setAccessError(err.response.data.detail);
        } finally {
            setLoading(false)
        }
    }

   
    const updateCartProduct = async(product_id, product_quantity) => {
        try {
            await api.put("/cart", {
                    id: product_id,
                    quantity: product_quantity
            });
            await getCart();
        } catch(err) {
            setError(err.response.data.detail);
            setEditedQuantityId(product_id);
        }
    }
    

    const removeFromCart = async (product_id) => {
        try {
            await api.delete(`/cart/${product_id}`)
            await getCart()
        } catch (err) {
            setError(err.response.data.detail);
            setEditedQuantityId(product_id);
        }
    }

    const selectCartProduct = async (product_id) => {
        try {
            await api.put(`/cart/${product_id}`)
            await getCart()
            setCheckoutError("")
        } catch (err) {
            setError(err.response.data.detail);
            setEditedQuantityId(product_id);
        }
    }

    const checkout = async () => {
        try {
            const response = await api.post("/payment/create-payment-session");
            window.location.href = response.data;
        } catch (err) {
            setCheckoutError(err.response.data.detail)
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    return (
        <div className="fixed top-0 right-0 flex flex-col bg-gray-50 items-start shadow-lg h-screen overflow-y-auto mr-0 p-4">
        <Button text="X" onClick={() => {setIsOpenCart(false)}}/>
        {loading? (
        <div className="flex justify-center">
            <p className="my-8 w-68">Loading your cart...</p>
        </div>
        ) : 
        accessError? (
        <div className="flex justify-center items-center w-68 min-h-screen">
            <p className="text-red-600">{accessError}</p>
        </div>
        ) :
        cart.length === 0 ?(
        <div className="flex justify-center">
            <p className="my-8 w-68">
                Your cart is empty
            </p>
        </div>     
        ) :
        (
        cart.map((cartItem, index) => (
            <div className="flex items-start" key={cartItem.product.id}>
            <input type="checkbox" className="mr-0 mt-6 h-5 w-5 cursor-pointer rounded"
            onChange={() => {selectCartProduct(cartItem.product.id)}} checked={cartItem.is_selected} ></input>
            <div className="p-4 ml-4 m-2 bg-white shadow-xl"
            onClick={() => {navigate(`/products/${cartItem.product.id}`)}}
            key={cartItem.product.id}>
                <img className="w-50 h-50 object-cover"
                src={imageUrls[index]}></img>
                <div className="py-2">
                <p>{cartItem.product.name}</p>
                <p>{cartItem.product.price}</p>
                <p>In stock: {cartItem.product.stock_quantity}</p> 
                </div>
                <div className="flex justify-center items-center">
                    <Button
                    text="-" 
                    onClick={(e) => {
                        e.stopPropagation();
                        updateCartProduct(cartItem.product.id, cartItem.quantity - 1); 
                    }}/>
                    <p className="p-4"
                    >{cartItem.quantity}</p>
                    <Button text="+" onClick={(e) => {
                        e.stopPropagation();
                        updateCartProduct(cartItem.product.id, cartItem.quantity + 1);
                    }}/>
                </div>
                {error && editedQuantityId === cartItem.product.id && 
                <div className="flex justify-center">
                    <p className="text-red-600 text-xs pb-2">{error}</p>
                </div>
                }
                <Button text="Remove from cart" className="m-1 mx-auto block" 
                onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(cartItem.product.id);}} />
            </div>
            </div>
        )) )}
        {checkoutError && 
        <div className="flex justify center pt-4 ml-20 ">
            <p className="text-red-600">{checkoutError}</p>
        </div>       
        }
        {cart.length != 0 && !loading && !accessError &&
        <Button text="Checkout" className="mb-8 mt-4 ml-24 shadow-xl" onClick={checkout}/>
        }
        </div>
    )
}


export default Cart;