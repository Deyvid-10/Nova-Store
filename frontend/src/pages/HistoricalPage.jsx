import React from "react"

import OrderItems from '../components/OrderItems';
import { Link } from "react-router-dom";
import { fetchHistoricalData } from "../util/requests";
import { useQuery } from "@tanstack/react-query";
import IsLoading from "../components/IsLoading";
import { useEffect } from "react";
import { useState } from "react";

export default function HistoricalPage(){

    const {data: historicalData, isPending: historicalPending, isError: historicalError} = useQuery({
        queryKey: ['historicalRecord'],
        queryFn: fetchHistoricalData
    })


    if(historicalPending){
        return <IsLoading/>
    }

    if(historicalError){

        return(
            <div className="flex justify-center items-center h-full">
                <p className="text-lg font-semibold">Error: data not found</p>
            </div>
        )
    }

    if(!historicalData){
        return(
            <div className="flex justify-center items-center h-full">
                <p className="text-lg font-semibold">You are no logged</p>
            </div>
        )
    }


    let total = 0

    return(
        <>
            <h1 className="text-2xl text-center my-5 font-bold text-gray-900">Historical of orders</h1>
            <ul>
                {historicalData && historicalData.map((order)=>{
                    let prevDeliveryStimate = new Date(order.delivery_stimate)
                    let deliveryStimate = prevDeliveryStimate.toDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
                    let prevOrderDate = new Date(order.order_date)
                    let orderDate = prevOrderDate.toDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
                    
                    let timeProgress = (prevDeliveryStimate - prevOrderDate)

                    let time = new Date - prevOrderDate

                    let orderedToShipped = timeProgress  / 3

                    let shippedToRecibed = (timeProgress  / 3) * 2

                    let recibedToDelivered = (timeProgress  / 3) * 3
       
                    total = order.products.reduce((acum, current)=> {
                        let subtotal = current.price * current.quantity

                        return acum + subtotal
                    }, 0 )
                    
                    let orderTotal = "$" + (total + 10 + (0.18 * total)).toFixed(2)
                    
                    return <li key={order.order_number} className="py-5 m-5 rounded-xl lg:w-5xl border border-gray-200  lg:mx-auto gap-7 mx-2 px-4 sm:px-6 lg:px-8">
                        
                        <div className="md:flex justify-between border-b border-gray-200 pb-2 px-1">
                            <h2 className="md:text-xl font-medium text-gray-900">Order: <span>#{order.order_number.toString().padStart(14, "0")}</span></h2>
                            <p className="text-gray-700">{time >= recibedToDelivered ? "Delivered on" : "Delivery estimeted on:"} <span className="font-semibold">{deliveryStimate}</span></p>
                        </div>
                        
                        <h1 className="my-2 font-semibold md:text-2xl text-xl">{time >= recibedToDelivered ? "Order completed, thank you for choosing us" :"Purchase confirmed, tanks for order"}</h1>
                        <p className="text-gray-700">{time >= recibedToDelivered ? "This purchase was successfully completed." : "Your order is in progress. We'll keep you informed about your order. See your purchase info below. If you have any question feel free to contact us."}</p>
                    
                        <OrderItems products={order.products}/>
                        <div className="flex w-11/12 gap-1 items-center mx-auto my-15 ">
                            <div className="size-7 relative bg-indigo-600 rounded-full flex items-center justify-center">
                                <h6 className=" text-white text-s text-center ">1</h6>
                                <p className="absolute top-8 text-gray-700 font-semibold">Ordered</p>
                            </div>
                            <progress value={time} max={orderedToShipped} className="flex-grow h-1.5 progress-bar"></progress>
                            <div className={time >= orderedToShipped ? 
                                            "size-7 relative bg-indigo-600 rounded-full flex items-center justify-center"
                                            : "size-7 relative bg-gray-400 rounded-full flex items-center justify-center"}>
                                <h6 className=" text-white text-s text-center ">2</h6>
                                <p className="absolute top-8 text-gray-700 font-semibold">Shipped</p>
                            </div>
                            <progress value={time >= orderedToShipped ? time : 0} max={shippedToRecibed}  className="flex-grow h-1.5 progress-bar"></progress>
                            <div className={time >= shippedToRecibed ? 
                                            "size-7 relative bg-indigo-600 rounded-full flex items-center justify-center"
                                            : "size-7 relative bg-gray-400 rounded-full flex items-center justify-center"}>
                                <h6 className=" text-white text-s text-center ">3</h6>
                                <p className="absolute top-8 text-gray-700 font-semibold">Recibed</p>
                            </div>
                            <progress value={time >= shippedToRecibed ? time : 0} max={recibedToDelivered}  className="flex-grow h-1.5 progress-bar"></progress>
                            <div className={time >= recibedToDelivered ?
                                            "size-7 relative bg-indigo-600 rounded-full flex items-center justify-center"
                                            : "size-7 relative bg-gray-400 rounded-full flex items-center justify-center"
                            }>
                                <h6 className=" text-white text-s text-center ">4</h6>
                                <p className="absolute top-8 text-gray-700 font-semibold">Delivered</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 my-5">
                            <div>
                                <h4 className="font-semibold text-lg">Order date</h4>
                                <p className="text-gray-700">{orderDate}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Shipping address</h4>
                                <p className="text-gray-700">{order.shipping_address}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Payment method</h4>
                                <p className="text-gray-700">{order.payment_method}</p>
                            </div>
                        </div>
                        <div className="flex justify-between font-medium text-gray-900 mt-5">
                            <p className="font-semibold text-lg">Order summary</p>
                            </div>
                            <div className='flex justify-between py-3 border-b border-gray-300'>
                                <p className='text-sm text-gray-700'>Subtotal</p>
                                <p className='text-sm font-semibold'>${total.toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between py-3 border-b border-gray-300'>
                                <p className='text-sm text-gray-700'>Shipping estimate</p>
                                <p className='text-sm '>$10.00</p>
                            </div>
                            <div className='flex justify-between py-3 border-b border-gray-300'>
                                <p className='text-sm text-gray-700'>Tax estimate</p>
                                <p className='text-sm '>${(0.18 * total).toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between py-3'>
                                <p className='text-sm font-semibold'>Order total</p>
                                <p className='text-sm font-semibold'>{orderTotal}</p>
                        </div>
                        <p className="flex justify-end mt-5">
                            <Link to="/products" className="hover:cursor-pointer ml-auto font-medium text-indigo-600 hover:text-indigo-500">Continue Shopping</Link>
                        </p>
                    </li>
                })
                }
            </ul>
            
        </>
    )
}