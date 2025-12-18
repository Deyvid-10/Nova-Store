import React, {use, useRef} from 'react'

import {Link, useNavigate } from 'react-router-dom'
import ProductsList from '../components/ProductsList' 
import ConfirmOrderDialog from '../components/ConfirmOrderDialog';

import { useState } from 'react';
import { SesionContext } from '../store/sesion-context';
import { useContext } from 'react';
import { useEffect } from 'react';
import CartItems from '../components/CartItems';
import { useMutation } from '@tanstack/react-query';
import { addHistoricalData, queryClient } from '../util/requests';
import { toast } from 'react-toastify';
  

export default function CartPage() {

    const [openModal, setOpenModal] = useState(false)

    const [total, setTotal] = useState(0)

    const { cartItems, user} = useContext(SesionContext)
    
    const {data} = user

    const redirect = useNavigate()

    const randomNumber = Math.floor(Math.random() * 1000000000000)

    const {mutate: historicalAdd, isPending: pendingHistoricalAdd} = useMutation({
        mutationFn: addHistoricalData,
        onSuccess: (data)=>{
            if(data){
                queryClient.invalidateQueries({queryKey: ['cart']})
                redirect("/historical-record")
            }
            else{
                toast.success("You are not logged")
            }
        },
        onError: ()=>{
            toast.error("There is an error please try later")
        }
    })

    const { dataCartItems, cartItemsAreLoiding, cartItemsError } = cartItems

    function handleOrderConfirm()
    {
        if(dataCartItems)
        {
            const order = dataCartItems.map((item)=>{
                let delivery_stimate = new Date()
                delivery_stimate.setDate(new Date().getDate() + 14)
                return ({order_number: randomNumber, 
                    delivery_stimate: delivery_stimate.toISOString().slice(0, 19).replace("T", " "),
                    order_date: new Date().toISOString().slice(0, 19).replace("T", " "),
                    quantity: item.quantity,
                    variation_id: item.prod_cart_prod_variation_id,
                    product_id: item.prod_cart_prod_id,
                    user: 0,
                    address: data[0].users_address,
                    paymetn_method: data[0]["users_credit-card"],
                    cart_id: item.prod_cart_id})
                
            })
            
            
            historicalAdd({ order })
        }
    }

    

    useEffect(()=>{
        if(dataCartItems){
            setTotal(dataCartItems.reduce((acum, current)=> {
                let subtotal = current.price * current.quantity

                return acum + subtotal

            }, 0 ))
            
        }
    }, [dataCartItems])
    

    let orderTotal = "$" + (total + 10 + (0.18 * total)).toFixed(2)

    if(!data){
        return (<div className="flex justify-center items-center h-full">
            <p className="text-lg font-semibold">You are not logged</p>
        </div>)
    }

  return (
    <div>
        <ConfirmOrderDialog open={openModal} setOpenModal={setOpenModal} total={orderTotal} handleOrderConfirm ={handleOrderConfirm} pendingHistoricalAdd={pendingHistoricalAdd}/>
        <div className="flex flex-col lg:flex-row py-5 h-full bg-white mx-auto max-w-7xl gap-7 px-4 sm:px-6 lg:px-8">
            
            {/* Products in the cart */}
            <div className="w-full xl:w-8/12 lg:w-7/12  ">
        
                <h3 className="text-lg font-medium text-gray-900">Shopping cart</h3>

                <CartItems dataCartItems={dataCartItems} cartItemsAreLoiding={cartItemsAreLoiding} cartItemsError={cartItemsError} />
                
            </div>
            {/* Order summary */}
            <div className="bg-gray-50 rounded h-[360px] px-4 w-full lg:w-5/12 xl:w-4/12 py-6 sm:px-6">
                <div className="flex justify-between font-medium text-gray-900">
                    <p>Order summary</p>
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
                <div className="mt-6">
                    <button
                        onClick={()=> {setOpenModal(true)}}
                        disabled={dataCartItems && dataCartItems.length === 0}
                    className="hover:cursor-pointer w-full rounded-md border border-transparent bg-indigo-600 px-6 py-1.5 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                        Checkout
                    </button>
                    
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                    or{' '}
                    <Link to="/products"
        
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                    </p>
                </div>
            </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Suggestions</h2>
                <Link to="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                    View more
                </Link>
            </div>
            <ProductsList queries={'suggestions=true'}/>
        </div>
    </div>
  )
}
