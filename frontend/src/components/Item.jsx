import React, { useContext } from "react"

import { StarIcon } from '@heroicons/react/20/solid'
import { SesionContext } from "../store/sesion-context"



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const urlImg = 'http://localhost:3000/'

export default function Item({product}){

  const { addItemCart } = useContext(SesionContext)
  const { addItemToCart, addToCartPending } = addItemCart

  function submitCartItem(event){
    event.preventDefault()

    const item =  { quantity: 1, variation_id:  product.prod_variation_id, product_id: product.products_id,}
    
    addItemToCart({item})
  }
  return (
    <div className="flex flex-col">
      <a href={`/products/${product.products_id}/?color=${product.prod_variation_color}&size=${product.prod_variation_size}`} className="group relative">
              <img
                alt={"image for " + product.products_name}
                src={urlImg + product.products_main_img}
                className=" w-full rounded-md  object-contain group-hover:opacity-75 lg:aspect-auto h-72 "
              />
            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                           product.rate_total > rating ? 'fill-amber-300' : 'text-gray-200',
                          'size-5 shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p  className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product.reviews} reviews
                  </p>
                </div>
            </div>

              <div className="mt-4">
                <div>
                  <h3 className="font-semibold text-gray-700 w-[20] h-[72px] overflow-y-hidden">
                  
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.products_name}
                    
                  </h3>
                  
                </div>
                <div className="flex justify-between mt-4">
                  <p className="mt-1  text-gray-500">{product.prod_variation_color}{(product.prod_variation_color && product.prod_variation_size) && ","} {product.prod_variation_size}</p>
                  <p className="font-medium text-gray-900">{'$' + product.products_price}</p>
                </div>
              </div>
      </a>
      <form onSubmit={submitCartItem}>
        <button disabled={addToCartPending} className="w-full bg-gray-100 mt-5 text-sm text-gray-900 rounded p-2 text-center hover:bg-gray-200 hover:cursor-pointer">Add to cart</button>
      </form>
    </div>
  )


}