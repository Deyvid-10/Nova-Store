import React from 'react'

import {Link} from 'react-router-dom'
import logo from '../assets/img/LOGO.png'

import { FaFacebook, FaXTwitter, FaYoutube , FaInstagram } from 'react-icons/fa6'

const optionsColumns = {
  pages: [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/products' },
    // { name: 'About us', to: '/' },
    { name: 'Cart', to: '/cart' },
  ],

  categories: [
    { name: 'Technology', to: '/products' },
    { name: 'Clothing and accessories', to: '/products' },
    { name: 'Home and decoration', to: '/products' },
    // { name: 'Beauty and Personal Care', to: '/products' },
  ],

    support: [
    { name: 'Terms & Conditions', to: 'terms-and-conditions' },
    { name: 'Privacy Policy', to: 'privacy-policy' },
  ]
}

    let socialMediaIcons = [
    // <Link target='_blank' to="https://www.facebook.com/?locale=es_LA">
    //   <FaFacebook className='hover:text-blue-700 transition duration-300 w-5 h-5'/>
    // </Link>, 
    // <Link target='_blank' to="https://x.com/?lang=es">
    //   <FaXTwitter className='hover:text-black transition duration-300 w-5 h-5' />
    // </Link>, 
    // <Link target='_blank' to="https://www.instagram.com/">
    //   <FaInstagram className='hover:text-pink-600 transition duration-300 w-5 h-5'/>
    // </Link>, 
    // <Link target='_blank' to="https://www.youtube.com/">
    //   <FaYoutube className='hover:text-red-600 transition duration-300 w-5 h-5'/>
    // </Link>
    ]

export default function Footer(){



    return(
    <footer className="mx-auto max-w-7xl mt-20 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-y-8 gap-x-16  mb-8 lg:grid-cols-5">
        <div className="md:max-w-md lg:col-span-2">


          {/* Logo */}
          <Link to="/" className='flex items-center justify-center md:justify-normal'>
            <img
              alt="logo company"
              src={logo}
              className=" w-12"
            />
            <p className='font-bold text-2xl logoText'>Nova <span className='text-indigo-500'>Store</span></p>
          </Link>

          {/* Description */}
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-gray-600">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Eaque ipsa quae ab illo inventore veritatis et quasi architecto
              beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>

        {/* Columns options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 space-y-5 sm:space-y-0 gap-5 lg:col-span-3 md:grid-cols-3">
          <div>
            <h6 className="text-sm font-medium text-gray-700 hover:text-gray-800">
              Pages
            </h6>
             <ul className="text-sm ml-1">
              {optionsColumns.pages.map((page, index) => (
                <li key={index} className="mt-6"><Link to={page.to}  className="text-gray-600 hover:text-gray-900">{page.name}</Link></li>

              ))
              }
            </ul>
          </div>
          <div>
            <h6 className="text-sm font-medium text-gray-700 hover:text-gray-800">
              Categories
            </h6>
            <ul className="text-sm ml-1">
                {optionsColumns.categories.map((page, index) => (
                  <li key={index} className="mt-6"><Link to={page.to}  className="text-gray-600 hover:text-gray-900">{page.name}</Link></li>

                ))
                }
              </ul>
          </div>
          <div>
            <h6 className="text-sm font-medium text-gray-700 hover:text-gray-800">Support</h6>
              <ul className="text-sm ml-1">
                {optionsColumns.support.map((page, index) => (
                  <li key={index} className="mt-6"><Link to={page.to}  className="text-gray-600 hover:text-gray-900">{page.name}</Link></li>

                ))
                }
              </ul>
          </div>
          {/* <div className='text-sm '>
            <h6 className="font-medium text-gray-700 hover:text-gray-800 mb-6">Contact us</h6>
            <div className='ml-1'>
              <p className='text-gray-600  mb-6'>For more details, please contact us.</p>
              <a href="#" className="flex items-center justify-center rounded-md border text-indigo-600 bg-white border-indigo-600 px-6 py-1.5 text-base font-medium  shadow-xs hover:bg-gray-50">Contact us</a>
            </div>
          </div> */}
        </div>
      </div>

      {/* Social media & copyright */}
      <div className="flex flex-col items-center sm:justify-between pt-5 pb-10 border-t border-gray-300 sm:flex-row">
        <p className="text-sm text-gray-600">
          © Copyright 2025 Deyvid Marmolejo. All rights reserved.
        </p>
        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
          
          {socialMediaIcons.map((icon, index)=>(
            <a
            href="/"
            key={index}
            className=" text-gray-500 w-6 h-6"
          >
           {icon}
          </a>
          ))}
          
 
        </div>
      </div>
    </footer>
  
        

    )
}