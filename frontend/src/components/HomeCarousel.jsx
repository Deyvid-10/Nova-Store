import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Arrow from './Arrow';

import { CreditCardIcon, GlobeAmericasIcon, PaperAirplaneIcon, BuildingStorefrontIcon } from '@heroicons/react/20/solid'

import Slider from "react-slick";
import { Link } from 'react-router';


export default function Carousel(){
    
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        nextArrow: <Arrow arrow="right"/>,
        prevArrow: <Arrow arrow="left"/>,
        customPaging: i => (
    <div className="size-2.5 group -mt-12 md:-mt-14 rounded-full bg-gray-300 opacity-75 hover:bg-indigo-600 transition" />
  ),
        // autoplay: true,
        arrow: true,
        pauseOnHover: true,
        autoplaySpeed: 5000

    };




    return(
        <section >
            <Slider className='md:h-[600px] h-[400px] relative w-full bg-gray-100' {...settings}>
                {/* Slide 1 */}
                <section className='md:h-[600px] h-[400px] relative'>
                    <img className='size-full object-cover' src="https://content.elmueble.com/medio/2019/01/17/00433241_40fd9253_1280x650.jpg" alt="Slideer image 1" />
                    <div className='absolute inset-0 opacity-65  bg-black size-full'>
                        {/* <button className='text-9xl'>sdasdasddas</button> */}
                    </div>
                    <div className='absolute inset-0 size-full flex flex-col items-center p-15 gap-4 md:gap-10 justify-center'>
                        <h1 className='text-white text-center text-xl md:text-4xl font-bold '>Free Shipping on Orders Over $100!</h1>
                        <section className='text-gray-200 text-md md:text-xl'>
                            <p>Shop your favorites and enjoy fast, free delivery when you spend $100 or more.</p>
                            <p className='mt-1'>No hidden fees. No extra charges. Just smooth shopping from cart to doorstep.</p>
                        </section>
                        <Link to="products"
                            onClick={() => toast.success("Wow so easy!")}
                        className="w-30 flex items-center hover:cursor-pointer justify-center  rounded-md border border-transparent bg-indigo-600 px-6 py-1.5 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                        >
                            Buy now!
                        </Link>
                    </div>
                </section>
                {/* Slide 2 */}
                <section className='md:h-[600px] h-[400px] relative'>
                    <img className='size-full object-cover' 
                    src="https://es.gizmodo.com/app/uploads/2024/12/Diseno-sin-titulo-44-13.jpg" 
                    alt="Slideer image 2" />
                    <div className='absolute inset-0 opacity-65  bg-black size-full'>
                        {/* <button className='text-9xl'>sdasdasddas</button> */}
                    </div>
                    <div className='absolute inset-0 size-full flex flex-col items-center p-15 gap-4 md:gap-10 justify-center'>
                        <h1 className=' text-white text-center text-xl md:text-4xl font-bold '>Flexible Shopping, Global Delivery</h1>
                        <section className='text-gray-200 text-md md:text-xl'>
                            <p>Whether you prefer to shop in-store or online, we’ve got you covered.</p>
                            <p className='mt-1'>Choose your favorite payment method and get your order shipped <span className='font-bold'>anywhere in the world</span>. </p>
                            <p className='mt-1'>Smart shopping starts here — with savings you’ll love.</p>
                        </section>
                        <div className=' gap-4 md:gap-10 flex'>
                            <div className='bg-indigo-600  rounded-full'>
                                <CreditCardIcon className='text-white size-10 md:size-20 p-1 '/>
                            </div>
                            <div className='bg-indigo-600  rounded-full'>
                                <BuildingStorefrontIcon className='text-white size-10 md:size-20 p-1 '/>
                            </div>
                            <div className='bg-indigo-600  rounded-full'>
                                <GlobeAmericasIcon className='text-white size-10 md:size-20 p-1 '/>
                            </div>
                            <div className='bg-indigo-600  rounded-full'>
                                <PaperAirplaneIcon className='text-white size-10 md:size-20 p-1 '/>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Slide 3 */}
                <section className='md:h-[600px] h-[400px] relative'>
                    <img className='size-full object-cover' src="https://media.burford.co.uk/images/SNY04089.jpg_edit.width-1440_05001m7uKQ0crRoI.jpg" alt="Slideer image 3" />
                    <div className='absolute inset-0 opacity-65  bg-black size-full'>
                        {/* <button className='text-9xl'>sdasdasddas</button> */}
                    </div>
                    <div className='absolute inset-0 size-full flex flex-col items-center p-15 gap-4 md:gap-10 justify-center'>
                        <h1 className='text-white text-center text-xl md:text-4xl font-bold '>Everything You Need — All in One Place</h1>
                        <section className='text-gray-200 text-md md:text-xl md:w-[800px]'>
                            <p>From cutting-edge electronics that power your day, to stylish clothing that defines your look, and home essentials that bring comfort and convenience — <span className='font-bold'>you’ll find it all right here</span>.</p>
                            <p className='mt-1'>Explore a curated selection of your favorite brands, discover unbeatable daily deals, and enjoy fast, reliable delivery wherever you are.</p>
                        </section>
                    </div>
                </section>
            </Slider>
        </section>
    )
}