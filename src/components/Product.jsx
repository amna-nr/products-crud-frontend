import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";


function Product() {
    const [product, setProduct] = useState(null);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

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
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col justify-center items-end bg-slate-300 rounded border border-0 p-2" key={product.id}>

                {!isOpenDelete &&
                    <div className="relative">
                        <button className="text-2xl p-1"
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
                    
                <div className="flex flex-col p-2"
                onClick={() => {
                        setIsOpenMenu(false)
                        setIsOpenDelete(false)
                        setIsEditing(false)
                    }}>
                    <input className="focus:outline-none focus:ring-0 p-1"
                    value={product.name} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                    onChange={(e) => {setProduct({...product, name: e.target.value})}}></input>
                    <input className="focus:outline-none focus:ring-0 p-1"
                    value={product.price} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                    onChange={(e) => {setProduct({...product, price: e.target.value})}}></input>
                    <input className="focus:outline-none focus:ring-0 p-1"
                    value={product.quantity} onClick={(e) => {e.stopPropagation(); setIsEditing(true);}}
                    onChange={(e) => {setProduct({...product, quantity: e.target.value})}}></input>
                    {isEditing&&
                    <div className="flex justify-around">
                        <button className="rounded border border-0 text-white p-3 bg-blue-950 mt-4"
                        onClick={() => {setIsEditing(false)}}>
                            Cancel
                        </button>
                        <button className="rounded border border-0 text-white p-3 px-4 bg-blue-950 mt-4"
                        type="submit" onClick={updateProduct}>
                            Save
                        </button>
                    </div>
                    }     
                    {!isEditing&& 
                    <button className="rounded border border-0 text-white p-3 bg-blue-950 mt-4"> 
                        Add to cart
                    </button>
                    }  
                    </div>
            </div>
        </div>
    )  
}

export default Product;
