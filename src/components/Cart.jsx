import api from "../api/axios";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";

function Cart({setIsOpenCart}) {
    const [cart, setCart] = useState([])
    const [imageUrls, setImageUrls] = useState([])

    let navigate = useNavigate();
    const getCart = async () => {
        const response = await api.get("/cart")
        setCart(response.data)

        const imageUrls = await Promise.all( response.data.map(async (cartItem) => {
           const result = await api.get(`/images/${cartItem.product.name}`)
           return result.data
           }))
        setImageUrls(imageUrls)
        }

    const updateCartProduct = async(product_id, product_quantity) => {
        await api.put("/cart", {
                id: product_id,
                quantity: product_quantity
        });
        getCart();
    }

    const removeFromCart = async (product_id) => {
        await api.delete(`/cart/${product_id}`)
        await getCart()
    }

    useEffect(() => {
        getCart();
    }, [])

    return (
        <div className="fixed top-0 right-0 flex flex-col bg-gray-50 items-start shadow-lg h-screen ml-auto overflow-y-auto w-80">
        <button className="bg-blue-950 text-white p-2 px-4 rounded border m-4"
        onClick={() => {setIsOpenCart(false)}}>
            X
        </button>
        {cart.length == 0 ? (
            <p className="mx-auto my-8"
            >Your cart is empty</p>
        ) : (
        cart.map((cartItem, index) => (
            <div className="p-4 mx-8 m-2 bg-white shadow-xl ml-12"
            onClick={() => {navigate(`/products/${cartItem.product.id}`)}}
            key={cartItem.product.id}>
                <img className="w-50 h-50 object-cover"
                src={imageUrls[index]}></img>
                <div className="py-2">
                <p>{cartItem.product.name}</p>
                <p>{cartItem.product.price}</p>
                <p>In stock: {cartItem.product.stock_quantity}</p> 
                </div>
                <div className="flex justify-center">
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
                <Button text="Remove from cart" className="p-3 px-4 m-1 mx-auto block" 
                onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(cartItem.product.id);}} />
            </div>
        ))
        )}
        </div>
    )
}


export default Cart;