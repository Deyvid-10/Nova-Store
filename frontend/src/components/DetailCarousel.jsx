import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Arrow from './Arrow';

import Slider from "react-slick";

export default function DetailCarousel({product, color}){
    
    let imgs
    console.log(color);
    
    console.log(color !== "null");
    
    if(color !== "null"){
        imgs = product.products_imgs.filter(prod => prod.color === color)
    }
    else{
        imgs = product.products_imgs
    }
    const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            nextArrow: <Arrow arrow="right"/>,
            prevArrow: <Arrow arrow="left"/>,
            // Images botons
            customPaging: i => (
                <div key={i} className="size-13 mt-4 group-details border-2 border-gray-300 rounded-lg  hover:border-indigo-600 transition">

                    <img
                    alt={'item image ' + i}
                    src={'http://localhost:3000/' +  imgs[i].img}
                    className="size-full rounded-lg object-cover"
                    />

                </div>
            ),
            arrow: true,
            pauseOnHover: true,
            // autoplay: true,
            autoplaySpeed: 5000,

        };

    return(
        <Slider {...settings}>
            
            {/* Images in the carousel */}
            {imgs.map((img, index) => <div className='w-full h-[700px]' key={index}>
                <img
                alt={'images number ' + index}
                src={'http://localhost:3000/' + img.img}
                className="size-full rounded-lg object-contain"
                        />
            </div>)}
         
        </Slider >
    )
}