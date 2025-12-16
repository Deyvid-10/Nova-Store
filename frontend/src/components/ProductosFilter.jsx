import React, { useEffect } from 'react'

import ProductList from '../components/ProductsList'
import { useSearchParams } from 'react-router-dom'


import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { queryClient } from '../util/requests'

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: '', label: 'None'},
      { value: 'white', label: 'White'},
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown'},
      { value: 'green', label: 'Green'},
      { value: 'black', label: 'Black'},
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: '', label: 'None'},
      { value: 'Technology', label: 'Technology' },
      { value: 'Clothing and accessories', label: 'Clothing and accessories'},
      { value: 'Home and decoration', label: 'Home and decoration'},
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '', label: 'None'},
      { value: '8.5', label: '8.5',  },
      { value: '8', label: '8', },
      { value: '9', label: '9', },
      { value: 'S', label: 'S', },
      { value: 'M', label: 'M',  },
      { value: 'L', label: 'L', },
    ],
  },
]

export default function ProductosFilter() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  //  hook for handle the params
  const [searchParams, setSearchParams] = useSearchParams()

  //  get the params
  const searchSort = searchParams.get('sort')
  const searchSearch = searchParams.get('search')
  const searchcategory = searchParams.get('category')
  const searchColor = searchParams.get('color')
  const searchSize = searchParams.get('size')

  // set the params to send the back end
  let query = ''
  
  if(searchSearch){
    query += 'search=' + searchSearch + '&'    
  }

  if(searchSort){
    query += 'sort=' + searchSort + '&'  
  }

  if(searchcategory){
    query += 'category=' + searchcategory + '&'  
    
  }

  if(searchColor){
    query += 'color=' + searchColor + '&'  
    
  }

  if(searchSize){
    query += 'size=' + searchSize + '&'  
    
  }

  // handle the front end params
  const filtersParams = Object.fromEntries(searchParams)
  
  function handleSort(href){
    
    setSearchParams({...filtersParams, sort:href})
  }

  function handlefilters(event, section){
    if(section === 'color'){
      setSearchParams({...filtersParams, color:event.target.value})
    }
    else if(section === 'category'){
      setSearchParams({...filtersParams, category:event.target.value})
    }
    else{
      setSearchParams({...filtersParams, size:event.target.value})
    }
  }

  const sortOptions = [
    { name: 'Most Popular', href: 'popular' },
    { name: 'Best Rating', href: 'bestRate' },
    { name: 'Newest',  href: 'Newest'},
    { name: 'Price: Low to High', href: 'higher' },
    { name: 'Price: High to Low', href: 'lower' },
  ]


  return (
    <div className="bg-white pb-15">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure  defaultOpen key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        
                       {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.value === searchcategory || option.value === searchColor || option.value === searchSize}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="radio"
                                  className="col-start-1 row-start-1 appearance-none rounded-full border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  onChange={(event => {handlefilters(event, section.id)})}
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <section  className="pt-6 pb-1">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            
            <div className="flex gap-4">
              {/* Filters */}
              <form className="hidden lg:block w-[190px]">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure key={section.id} defaultOpen as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.value === searchcategory || option.value === searchColor || option.value === searchSize}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="radio"
                                  className="col-start-1 row-start-1 appearance-none rounded-full border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  onChange={(event => {handlefilters(event, section.id)})}
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Products */}
                
              <div  className="w-full">

                <div className="flex items-center ml-auto justify-end">
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="group flex justify-center text-sm font-medium hover:cursor-pointer text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name}>
                            <button
                              onClick={()=>{handleSort(option.href)}}
                              className={ " text-gray-900 block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden" }                 
                            >
                              {option.name}
                            </button>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>

                  {/* Filter button */}
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden hover:cursor-pointer"
                  >
                    
                    <FunnelIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>


              <ProductList queries={query}/>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
