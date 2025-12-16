import React, { createContext, useState } from "react";
import { useMutation, useQuery } from '@tanstack/react-query';

import {  addCartItem, fetchCartItems, fetchUser, queryClient } from '../util/requests.js'
import { toast } from "react-toastify";

export const SesionContext = createContext({
    user: {},
    cartItems: {},
    addItemCart: {}
})


export default function SesionContextProvider({children}){

    const {data, isLoading, isError, isSuccess} = useQuery(
        {
            queryKey: ['user'],
            queryFn: fetchUser,
        }
    ) 

    const {data: dataCartItems, isLoading: cartItemsAreLoiding, isError: cartItemsError} = useQuery(
        {
            queryKey: ['cart'],
            queryFn: fetchCartItems,
        }
    ) 

    const {mutate: addItemToCart, isPending: addToCartPending} = useMutation(
        {
          mutationFn: addCartItem,
          mutationKey: ['addCartItem'],
          onSuccess: (data) => {

            queryClient.invalidateQueries({queryKey: ['cart']})
            if(data){
                toast.success(data.message)
            }
            else{
                toast.error('You are not logged')
            }
            
            
          },
          onError: () =>{
    
              toast.error('Error to add the item in the cart')
      
          }
        }
      )

    const ctxVlue = {
        user: {data, isLoading, isError, isSuccess},
        cartItems: { dataCartItems, cartItemsAreLoiding, cartItemsError },
        addItemCart: { addItemToCart, addToCartPending }
    }

    return <SesionContext.Provider value={ctxVlue}>
        {children}
    </SesionContext.Provider>
}