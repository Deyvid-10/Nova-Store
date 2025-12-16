import React from "react"
import Item from "./Item"

import { useQuery } from "@tanstack/react-query"

import { fetchProducts } from '../util/requests'

import IsLoading from './IsLoading'

export default function ProductList({queries}){

  const { data: products, isError, error, isLoading } = useQuery({
    queryKey: ['products', {queries}],
    queryFn: ()=> fetchProducts({queries}),
  });
  
  if (isLoading) {
    return <IsLoading/>
  }

  if (isError) {
    return  <div className="h-full flex items-center justify-center">
              <p className="text-center font-medium text-xl">Error: Products not found</p>
            </div>
  }

  if (products.length === 0) {
    
    return  <div className="h-full flex items-center justify-center">
              <p className="text-center font-medium text-xl">Products not found or not exist</p>
            </div>
  }
  
  return (
    <div className="bg-white flex-wrap my-5">
      
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
              
              <Item key={index} product={product}/>
          ))}
        </div>
      
    </div>
  )


}