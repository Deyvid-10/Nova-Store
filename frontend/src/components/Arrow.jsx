import React from 'react'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Arrow({onClick, arrow}){
    return (
    <div>
        {arrow === "left" ? 
        
        <div
          className="absolute md:left-7 left-2 top-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-indigo-50 transition ease-in-out duration-100"
          onClick={onClick}
        >
          <FaChevronLeft className="text-indigo-600 size-3" />
        </div>
        
    :
    
        <div
          className="absolute md:right-7 right-2 top-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-indigo-50 transition ease-in-out duration-100"
          onClick={onClick}
        >
          <FaChevronRight className="text-indigo-600 size-3" />
        </div>
    
    }
    </div>
  );

}