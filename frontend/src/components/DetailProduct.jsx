import React, {useContext, useState} from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import {  fetchOneProduct } from '../util/requests' 

import { Link, useSearchParams } from 'react-router-dom'

import ProductsList from './ProductsList'
import Comments from './Comments'
import DetailCarousel from './DetailCarousel'
import IsLoading from './IsLoading'

import { StarIcon } from '@heroicons/react/20/solid'
import { SesionContext } from '../store/sesion-context'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DetailProduct({idItem}) {
  //  hook for handle the params
  const [searchParams, setSearchParams] = useSearchParams()

  //  get the params
  const searchColor = searchParams.get('color')
  const searchSize = searchParams.get('size')
  
  const [color, setColor] = useState(searchColor)
  // const [color, setColor] = useState('')

  // get the product id
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', { product_id: idItem }],
    queryFn: ({signal}) => fetchOneProduct({ signal, idItem }),
    
  });

  const { addItemCart } = useContext(SesionContext)
  const { addItemToCart, addToCartPending } = addItemCart

  if (isError) {
    return  <div className="h-full flex items-center justify-center">
              <p className="text-center font-medium text-xl">Error: Products not found</p>
            </div>
  }

  if(isLoading){
    return <IsLoading/>
  } 
  
 

  // handle the options
  if(data && color === '' && data.option.length > 0){
    setColor(data.option[0].color)
  }
    
  const itemParams = Object.fromEntries(searchParams)

  function handleColor(event){
    const color = event.target.value.split("*")[1]
    
    setColor(color)
    setSearchParams({...itemParams, color})
    
    
  }

  function handleSize(event){
    const size = event.target.value.split("*")[1]

    setSearchParams({...itemParams, size})
  }
  
  function handleFormOptions(event){
    event.preventDefault()

    const fd = new FormData(event.target)

    let formColor = fd.getAll('color')
    
    let colorId = ''

    if(formColor.length > 0){
      colorId = formColor[0].split("*")[0]
    } 

    let formSize = fd.getAll('size')

    let sizeId = ''
    
    if(formSize.length > 0){
      sizeId = formSize[0].split("*")[0]
    }     
    
    const item =  { quantity: 1, variation_id:  Number(sizeId) || Number(colorId), product_id: data.products_id,}
    
    addItemToCart({item})
    
  }

  let existColor = []

  const colors = data.option.map((item, index) => {
    
    if(!existColor.find((color)=> color.color === item.color)){

        existColor = [...existColor, item]
        return (
              <div key={index} className="flex rounded-full outline -outline-offset-1 outline-black/10">
                <input

                  defaultValue={ item.id +  "*"  + item.color}
                  defaultChecked={item.color === searchColor}
                  name="color"
                  type="radio"
                  onChange={handleColor}
                  className={
                    `${item.style} size-8 cursor-pointer appearance-none rounded-full checked:outline-2 checked:outline-offset-2`
                  }
                />
              </div>
          )
      }
    })

    let counterSize = 0

    let sizes = data.option.map((item, index) => {
      
      

        if(item.color === color){
          counterSize += 1
          
          return (
                          
                <label
                  key={index}
                  className="group hover:cursor-pointer relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                >
                  <input
                    defaultValue={item.id +  "*"  + item.size}
                    defaultChecked={item.size === searchSize}
                    name="size"
                    type="radio"
                    className="absolute inset-0 hover:cursor-pointer appearance-none focus:outline-none disabled:cursor-not-allowed"
                    onChange={handleSize}
                  />
                  <span className="text-sm font-medium hover:cursor-pointer text-gray-900 uppercase group-has-checked:text-white">
                    {item.size}
                  </span>
                </label>
              )}
            
            })


  return (
    <div key={idItem} className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
          {/* Carousel */}
          <DetailCarousel product={data} color={color}/>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            
            <h1 className="lg:col-span-2 text-2xl font-bold pb-5 text-gray-900 sm:text-3xl">{data.products_name}</h1>
            
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{ "$" + data.products_price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        Math.floor(data.rate_total) > rating ? 'fill-amber-300' : 'text-gray-200',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {data.reviews} reviews
                </p>
              </div>
            </div>

            

            <form onSubmit={handleFormOptions} className="mt-10">
              {/* Colors */}
              {(data.option.length > 0 && data.option.find(option => option.color !== null ))
              
              && <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <div className="flex items-center gap-x-3">
                    {colors}
                  </div>
                </fieldset>
              </div>}

              {/* Sizes */}
              {(data.option.length > 0 && data.option.find(option => option.size !== null ))
                && 
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  
                  <fieldset aria-label="Choose a size" className="mt-4">
                    <div className="grid grid-cols-4 gap-3">
                      
                      {sizes}
                    </div>
                  </fieldset>
                </div>
              }

              <button
                disabled={addToCartPending}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Add to cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pt-6 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="lg:border-b lg:border-gray-200 text-xl font-bold pb-2 mb-5 text-gray-900 sm:text-2xl">Description</h3>

              <div className="space-y-6">
                <div className="text-base text-gray-900" dangerouslySetInnerHTML={{__html: data.products_description}}/>                
              </div>
            </div>

            <div className="mt-10">
              <h3 className="lg:border-b lg:border-gray-200 text-xl font-bold pb-2 mb-5 text-gray-900 sm:text-2xl">Highlights</h3>

              <div className="mt-4">
                <ul dangerouslySetInnerHTML={{__html:data.products_highlights}} className="list-disc space-y-2 pl-4 text-sm">
                  {/* {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))} */}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="lg:border-b lg:border-gray-200 text-xl font-bold pb-2 mb-5 text-gray-900 sm:text-2xl">Details</h3>

              <div className="mt-4 space-y-6">
                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{__html: data.products_details}}>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pt-6 lg:pr-8">


            {/* Comments */}
            <div>
              <h3 className="lg:border-b lg:border-gray-200 text-xl font-bold pb-2 mb-5 text-gray-900 sm:text-2xl">Comments</h3>
                
              <Comments product = {data} idItem = {idItem}/>
              
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
      </div>
    </div>
  )
}
