import api from "../api/axios";
import { useEffect, useState } from "react";
import Button from "./Button";

function Cart({setIsOpenCart}) {
    const [cart, setCart] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const getCart = async () => {
        const response = await api.get("/cart")
        setCart(response.data)

        const imageUrls = await Promise.all( response.data.map(async (cartItem) => {
           const result = await api.get(`/images/${cartItem.product.name}`)
           return result.data
           }))
        setImageUrls(imageUrls)
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
            <div className="p-4 mx-8 m-2 bg-white shadow-xl"
            key={cartItem.product.id}>
                <img className="w-50 h-50 object-cover"
                src={imageUrls[index]}></img>
                <p>{cartItem.product.name}</p>
                <p>{cartItem.product.price}</p>
                <p>In stock: {cartItem.product.quantity}</p> 
                <p>{cartItem.quantity}</p>
                <Button text="Remove from cart" className="p-3 px-4 m-1 mx-auto block" 
                onClick={() => {removeFromCart(cartItem.product.id)}} />
            </div>
        ))
        )}
        </div>
    )
}


export default Cart;