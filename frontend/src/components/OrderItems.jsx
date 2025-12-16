import React from "react"

import { Link, useNavigate } from "react-router-dom"
import { SesionContext } from "../store/sesion-context"
import { useContext } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import IsLoading from "./IsLoading"
import { deleteCartItem, fetchHistoricalData, queryClient, updateCartQuatity } from "../util/requests"
import { useMutation, useQuery } from "@tanstack/react-query"

export default function OrderItems({products}){

    const { user} = useContext(SesionContext)
    
    const {data, isLoading} = user

    const redirect = useNavigate()
    
    useEffect(()=>{
        if(!data && !isLoading){
            redirect("/")      
        }
    }, [data])
    
    
    return(
        <div className="mt-8">
            <ul className="-my-6 divide-y  divide-gray-200">
                
                {products.map((product) => (
                <li key={product.hist_record_id} className="flex flex-col sm:flex-row py-6 item-center">
                    
                    <div className="sm:size-24 size-6/12 overflow-hidden rounded-md border mx-auto mb-5 sm:m-0 border-gray-200">
                        <img alt={"Image for product "+ product.prod_name} src={'http://localhost:3000/' + product.img} className="size-full object-cover" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between ">
                        <div>
                            <div className="block sm:flex justify-between text-base font-medium text-gray-900">
                                <h3 className='text-center text-lg sm:text-start'>
                                    <Link to={`/products/${product.prod_id}/?color=${product.color}&size=${product.size}`}>{product.product_name}</Link>
                                </h3>
                                <p className="sm:ml-4">${product.price}</p>
                            </div>
                            {product.color && <p className="mt-1 mb-1 text-sm text-gray-500">{product.color}</p>}
                            {product.size && <p className="mt-1 mb-1 text-sm text-gray-500">{product.size}</p>}
                        </div>
                        <div className="flex items-end justify-between text-sm mt-7 sm:m-0">
                            <div className='flex items-center '>
                                <p className="text-gray-500">Qty: </p>
                               
                                <p className="text-gray-900 font-semibold ml-1 mt-0.5">{product.quantity}</p>
                                
                            </div>
                            <div className="flex">
                                <Link to={`/products/${product.prod_id}/?color=${product.color}&size=${product.size}`} className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Buy again
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
                )
}