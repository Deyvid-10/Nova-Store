import React from "react"

import { Link } from "react-router"

import HomeCarousel from '../components/HomeCarousel'
import ProductsList from '../components/ProductsList' 
import Category from "../components/Category"


export default function HomePage(){
    
    return(
        <main>
            {/* Carousel section */}
            <HomeCarousel/>
            {/* Categories section */}
            <Category/>

            {/* Featured Products */}
            <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>
                    <Link to="/products?sort=bestRate" className="font-medium text-indigo-600 hover:text-indigo-500">
                        View more
                    </Link>
                </div>
                <ProductsList queries={'featured=true'}/>
            </div>

            {/* Best prices section */}

            <section className="py-24 relative bg-gray-50">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                    <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
                        <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">The Best Prices, Always</h2>
                                <p className="text-gray-700 text-base font-normal leading-relaxed lg:text-start text-center">Discover a world of unbeatable deals on the products you love — from cutting-edge electronics and stylish fashion to must-have home essentials. Whether you're upgrading your tech, refreshing your wardrobe, or elevating your living space, we've got everything you need in one convenient place.</p>
                            </div>
                            <Link to="products/?sort=lower" className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg justify-center items-center flex">
                                <span className="px-1.5 text-white text-sm font-medium leading-6">View</span>
                            </Link>
                        </div>
                        <img className="lg:mx-0 mx-auto h-full rounded-3xl object-cover" src="https://story-seychelles.com/wp-content/uploads/2024/04/shopping7.webp" alt="about Us image" />
                    </div>
                </div>
            </section>
                                            
            {/* The newest products */}
           
            <div className=" mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">The newest products</h2>
                    <Link to="products?sort=Newest" className="font-medium text-indigo-600 hover:text-indigo-500">
                        View more
                    </Link>
                </div>
                <ProductsList queries={'newest=true'}/>
            </div>
        </main>
    )
}