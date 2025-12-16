import React from "react"

import { Link, useNavigate } from "react-router-dom"
import { SesionContext } from "../store/sesion-context"
import { useContext } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import IsLoading from "./IsLoading"
import { deleteCartItem, fetchHistoricalData, queryClient, updateCartQuatity } from "../util/requests"
import { useMutation, useQuery } from "@tanstack/react-query"

export default function CartItems({dataCartItems, cartItemsAreLoiding, cartItemsError}){
    


    const {mutate: deleteItemCart, isPending: deletePending, } = useMutation(
    {
      mutationFn: deleteCartItem,
      onSuccess: (data) => {
          
            queryClient.invalidateQueries({queryKey: ['cart']})
       
            toast.success(data.message)
       
        },
        onError: () =>{

            toast.error('Error to delete')
           
        }
        }
    )

    const {mutate: updateCart, isPending: upadatePending, isError:updateError} = useMutation(
    {
      mutationFn: updateCartQuatity,
      onSuccess: (data) => {
          
            queryClient.invalidateQueries({queryKey: ['cart']})       
        },
        onError: () =>{

            toast.error('Error to update')
           
        }
        }
    )

    function handleQuantity(id, event){

        let quantity = event.target.value
    
        updateCart({id, quantity})
    }
    
    useEffect(()=>{
               
        if(cartItemsError){      
          toast.error("Cart items not found")
        }


      }, [cartItemsError])

    function handleDelete(id){
        deleteItemCart({id})
    }

    if(dataCartItems){
        if(dataCartItems.length === 0){
        return(
            <div className="flex justify-center items-center h-full">
                <p className="text-lg font-semibold">There is not item in the cart</p>
            </div>
        )
    }
    }

 

    return(
        <div className="mt-8">
            <ul className="-my-6 divide-y  divide-gray-200">
                {cartItemsAreLoiding && <IsLoading/>}
                
                {dataCartItems && dataCartItems.map((product) => (
                <li key={product.prod_cart_id} className="flex flex-col sm:flex-row py-6 item-center">
                    
                    <div className="sm:size-24 size-6/12 overflow-hidden rounded-md border mx-auto mb-5 sm:m-0 border-gray-200">
                        <img alt={"Image for product "+ product.prod_name} src={'http://localhost:3000/' + product.main_img} className="size-full object-cover" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between ">
                        <div>
                            <div className="block sm:flex justify-between text-base font-medium text-gray-900">
                                <h3 className='text-center text-lg sm:text-start'>
                                    <Link to={`/products/${product.prod_cart_prod_id}/?color=${product.color}&size=${product.size}`}>{product.prod_name}</Link>
                                </h3>
                                <p className="sm:ml-4">${product.price}</p>
                            </div>
                            {product.color && <p className="mt-1 mb-1 text-sm text-gray-500">{product.color}</p>}
                            {product.size && <p className="mt-1 mb-1 text-sm text-gray-500">{product.size}</p>}
                        </div>
                        <div className="flex items-end justify-between text-sm mt-7 sm:m-0">
                            <div className='flex items-center '>
                                <p className="text-gray-500">Qty: </p>
                                <select onChange={(event)=>{handleQuantity(product.prod_cart_id, event )}} className="rounded-md ml-2 bg-white px-1  text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                                    <option value="1" selected={product.quantity === 1}>1</option>
                                    <option value="2" selected={product.quantity === 2}>2</option>
                                    <option value="3" selected={product.quantity === 3}>3</option>
                                    <option value="4" selected={product.quantity === 4}>4</option>
                                    <option value="5" selected={product.quantity === 5}>5</option>
                                    <option value="6" selected={product.quantity === 6}>6</option>
                                    <option value="7" selected={product.quantity === 7}>7</option>
                                    <option value="8" selected={product.quantity === 8}>8</option>
                                    <option value="9" selected={product.quantity === 9}>9</option>
                                    <option value="10" selected={product.quantity === 10}>10</option>
                                </select>
                            </div>
                            <div className="flex">
                                <button onClick={()=>handleDelete(product.prod_cart_id)} disabled={deletePending} type="button" className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
                )
}