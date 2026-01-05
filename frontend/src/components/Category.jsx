import React from "react"

import {Link} from 'react-router-dom'
    
    import Clothing from '../assets/img/Clothing.jpg'
    const callouts = [
  {
    name: 'Technology',
    description: 'Explore the latest in tech innovation',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Technology category.',
    to: '/products?category=Technology',
  },
  {
    name: 'Clothing and accessories',
    description: 'Discover fashion that fits your lifestyle',
    imageSrc: Clothing,
    imageAlt: 'Clothing and accessories category.',
    to: '/products?category=Clothing and accessories',
  },
  {
    name: 'Home and decoration',
    description: 'Daily commute essentials',
    imageSrc: 'https://assets-news.housing.com/news/wp-content/uploads/2018/01/30130410/Decor-trends-that-will-define-2018-FB-1200x700-compressed.jpg',
    imageAlt: 'Home and decoration category.',
    to: '/products?category=Homo+and+decoration',
  },
]

export default function Category() {
  return (
    <div className="bg-gray-100 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-12 ">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>

          <div className="mt-6 flex flex-col lg:flex-row gap-2 lg:h-[450px]">
            <div key={callouts[0].name} className="relative h-[300px] lg:h-full lg:w-1/2 hover:cursor-pointer ">
                <img
                  alt={callouts[0].imageAlt}
                  src={callouts[0].imageSrc}
                  className="w-full h-full rounded-lg bg-white object-cover brightness-75 hover:opacity-95"
                />
                <div className="absolute bottom-5 left-5">
                    <p className="mt-6 text-sm text-gray-100">{callouts[0].description}</p>
                    <h3 className=" text-lg font-semibold text-white">
                      <Link to={callouts[0].to}>
                        <span className="absolute inset-0" />
                        {callouts[0].name}
                      </Link>
                    </h3>
                </div>
            </div>

            <div className="flex flex-col lg:w-1/2  overflow-hidden  hover:cursor-pointer">

                <div key={callouts[1].name} className="h-[300px] lg:h-[220px] relative">
                    <img
                    alt={callouts[1].imageAlt}
                    src={callouts[1].imageSrc}
                    className="w-full  h-full rounded-lg bg-white object-cover brightness-75 hover:opacity-95"
                    />
                <div className="absolute bottom-5 left-5">
                    <p className="mt-6 text-sm text-gray-100">{callouts[1].description}</p>
                    <h3 className=" text-lg font-semibold text-white">
                      <Link to={callouts[1].to}>
                        <span className="absolute inset-0" />
                        {callouts[1].name}
                      </Link>
                    </h3>
                </div>
                </div>

                <div key={callouts[2].name} className="mt-2 h-[300px] lg:h-[222px] w-full relative  hover:cursor-pointer">
                    <img
                    alt={callouts[2].imageAlt}
                    src={callouts[2].imageSrc}
                    className="w-full h-full rounded-lg bg-white object-cover brightness-75  hover:opacity-95"
                    />
                    <div className="absolute bottom-5 left-5">
                        <p className="mt-6 text-sm text-gray-100">{callouts[2].description}</p>
                        <h3 className=" text-lg font-semibold text-white">
                          <Link to={callouts[2].to}>
                            <span className="absolute inset-0" />
                            {callouts[2].name}
                          </Link>
                        </h3>
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )


}