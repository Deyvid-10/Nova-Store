import React, {useRef} from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { useNavigate } from 'react-router-dom'; 

export default function Search({...props}){

    const redirect = useNavigate()

    const searchText = useRef()

    function handleSearch(){
        
        redirect('/products/?search='+ searchText.current.value);
        
    }

    function handleSearchEnter(event){
        event.preventDefault()
        if(event.key === 'Enter'){
            handleSearch()
        }
    }

    return  <div {...props}>
                <input
                    id="seacrhItem"
                    name="seacrhItem"
                    type="text"
                    className="block rounded-2xl w-full text-gray-600 bg-white/5 px-3 py-0.5 text-base outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    placeholder='Search...'
                    ref={searchText}
                    onKeyDown={handleSearchEnter}
                />
                
                <button onClick={handleSearch} className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                </button>
            </div>
}