
import React, {useContext} from 'react';

import { SesionContext } from '../store/sesion-context.jsx';

import Search from './Search';
import logo from '../assets/img/LOGO.png'

import {NavLink, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query';

import {  fetchUser, fetchLogout, queryClient } from '../util/requests.js'

import { useState } from 'react'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems 
} from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import IsLoading from './IsLoading.jsx';

const navigation = {
  pages: [
    { name: 'Home', to: '/' },
    { name: 'Products', to: 'products' },
    // { name: 'About us', to: 'about-us' },
  ],

  messageHeaders: [
    {message: "Buy more, save more—shop now"},
    {message: "Shop the latest arrivals"},
    {message: "Made with care, delivered with love"},
    {message: "Global delivery, local service"},
    {message: "Join thousands of happy customers"},
    {message: "Quality you can trust"},
    {message: "Your favorites, now in stock"},
  ]
}

export default function MainNavBar() {
  const [open, setOpen] = useState(false)

  const randomMessage = Math.floor(Math.random() * 7)

  const {user, cartItems} = useContext(SesionContext)

  const {data, isLoading, isError: isErrorUser} = user
  
  const { dataCartItems, cartItemsError } = cartItems

  useEffect(()=>{
    
    if(cartItemsError){      
      toast.error("Cart items not found")
    }
    
    if(isErrorUser){      
      toast.error("User not found")
    }
  }, [isErrorUser, cartItemsError])

  const {mutate, isPending, isError} = useMutation(
      {
        mutationFn: fetchLogout,
        mutationKey: ['logout'],
        onSuccess: (data) => {
  
          queryClient.invalidateQueries({queryKey: ['user']}) 
          queryClient.invalidateQueries({queryKey: ['cart']})
          // window.location.reload()

        }
      }
    )

  function logout(){
    mutate()
  }

  return (
    <div className="bg-white">
     {/*  Mobile menu */}
      <Dialog open={open} onClose={setOpen} className=" z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear "
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2 ">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 flex items-center justify-center rounded-md p-2 text-gray-400 hover: cursor-pointer hover:text-gray-500"
              >
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

             {/* Logo menu */}
              <div className="flex my-3 ml-2">
                <Link to="/" className='flex items-center '>
                  <img
                    alt="logo company"
                    src={logo}
                    className=" w-12"
                  />
                  <p className='font-bold text-2xl mt-1.5 logoText'>Nova <span className='text-indigo-500'>Store</span></p>
                </Link>
              </div>

            {/* Mobile menu items */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} >
                   <NavLink
                      key={page.name}
                      to={page.to}
                      className={({isActive})=> isActive ? " flex items-center  font-medium text-indigo-700" : "flex items-center font-medium text-gray-700 hover:text-indigo-700 transition duration-200"}
                    >
                      {page.name}
                    </NavLink>
                </div>
              ))}

              <NavLink to="/cart"
                      className={({isActive})=> isActive ? " flex items-center  font-medium text-indigo-700" : "flex items-center font-medium text-gray-700 hover:text-indigo-700 transition duration-200"}>
                  Cart
              </NavLink>
            </div>

            {/* Acount options */}

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="">
                <a href="/sign-up" className="-m-2 block p-2 font-medium text-gray-900">
                  Sign up
                </a>
              </div>
              <div className="">
                <a href="/log-in" className="-m-2 block p-2 font-medium text-gray-900">
                  Log in
                </a>
              </div>
            </div>

            {/* <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>


      <header className="relative bg-white">
        <p className="flex h-8 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          {navigation.messageHeaders[randomMessage].message}
        </p>

        <nav className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-14 items-center">
              {/* Menu button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative md:mr-0 mr-auto rounded-md bg-white p-2 text-gray-400 lg:hidden hover:cursor-pointer hover:text-gray-500"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="flex ">
                <Link to="/" className='flex items-center '>
                  <span className="sr-only">Your Company</span>
                  <img
                    alt="logo company"
                    src={logo}
                    className=" w-12"
                  />
                  <p className='font-bold text-2xl logoText sm:block hidden'>Nova <span className='text-indigo-500'>Store</span></p>                </Link>
              </div>

              <span aria-hidden="true" className="h-6 ml-4 w-px bg-gray-200 lg:block hidden" />

              {/* Menu items */}
              <section className="hidden lg:ml-4 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                        <NavLink
                          key={page.name}
                          to={page.to}
                          className={({isActive})=> isActive ? " flex items-center  font-medium text-indigo-700" : "flex items-center font-medium text-gray-700 hover:text-indigo-700 transition duration-200"}
                        >
                          {page.name}
                        </NavLink>
                      ))}
                </div>
              </section>

              

              {/* Function icons */}
              <div className="ml-auto flex items-center">
                {/* Search */}

                <Search className="hidden items-center mr-4 w-80 md:flex"/>
 

                <span aria-hidden="true" className="h-6 w-px bg-gray-200 md:block hidden" />


                {/* User options */}
                <Menu as="div"   className="relative ">
                  <MenuButton className="flex items-center ml-4 p-2 hover:cursor-pointer">
                    { isLoading && <IsLoading/> }

                    {!data && <UserIcon aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 hover:text-gray-500 "/>}
                  
                    {data && <img className='size-7 rounded-full border-2 border-indigo-600' src={data[0].users_img} alt="profile photo" />}
                  </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-min-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
               
                          {!data && 
                            <div className='w-56 gap-5 flex justify-center items-center rounded-md bg-white shadow-2xl  transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in p-4'>
                              <MenuItem>
                                <Link to="sign-up" className="text-sm rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                  Sign up
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                  <Link to="log-in" className="text-sm font-medium text-gray-700 hover:text-gray-800 px-3 py-1.5">
                                    Log in
                                  </Link>
                              </MenuItem>
                            </div>}
                          {data &&  
                            <div className='w-full rounded-md bg-white text-gray-800 shadow-2xl  transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in p-4'>
                              <MenuItem>
                                <div className='flex whitespace-nowrap mb-2 gap-1 border-b-2 text-black border-gray-200 py-1 font-semibold'>
                                  <p>{data[0].users_name}</p>
                                  <p>{data[0].users_last_name}</p>
                                </div>
                              </MenuItem>
                              <MenuItem>
                                  <div>
                                    <Link to="/edit-profile">
                                      Edit profile
                                    </Link>
                                  </div>
                              </MenuItem>
                              <MenuItem>
                                  <div>
                                    <Link to={'/historical-record'}>
                                      Historical record
                                    </Link>
                                  </div>
                              </MenuItem>
                              <MenuItem>
                                  <button onClick={logout} disabled={isPending}>Logout</button>                           
                              </MenuItem>
                            </div>}
                      
                 
                    </MenuItems>
                  </Menu>


                

           

                {/* Cart */}
                <div className="ml-2">
                  <Link to="Cart" className=" -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6  text-gray-400 hover:text-gray-500"
                    />
                    {dataCartItems && <span className="ml-2 text-sm font-medium text-gray-700 hover:text-gray-800">{dataCartItems.length}</span>}
                  </Link>
                </div>

                {/* Language */}

                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}
              </div>
            </div>

            <Search className="flex md:hidden items-center w-full mb-2"/>
          </div>

          
        </nav>
      </header>
    </div>
  )
}
