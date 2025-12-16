import './App.css'
import React from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './util/requests'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import SesionContextProvider from './store/sesion-context'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import DetailProductPage from './pages/DetailProductPage'
import CartPage from './pages/CartPage'
import ErrorsPage from './pages/ErrorsPage'
import TermsAndConditionsPage from './pages/TermsAndConditionsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

import MainNavigation from './components/MainNavigation'

import HistoricalPage from './pages/HistoricalPage'
import EditProfilePage from './pages/EditProfilePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation/>,
    errorElement: <ErrorsPage/>,
    children: [
      {index: true,
        element:<HomePage />
      },
      
      {path:"cart", element: <CartPage/>},
      {path:"about-us", element: <ErrorsPage/>},
      {path:"products", 
        children:[
          {index: true, element: <ProductsPage/>},
          {path:":idItem", element: <DetailProductPage/>},
        ]
      },
      // {path:"products/:idItem", element: <DetailProductPage/>},
      {path:"terms-and-conditions", element: <TermsAndConditionsPage/>},
      {path:"privacy-policy", element: <PrivacyPolicyPage/>},
      {path:"historical-record", element: <HistoricalPage/>},
    ]
  },
  {path:"/log-in", element: <LogInPage/>},
  {path:"/sign-up", element: <SignUpPage/>},
  {path:"/edit-profile", element: <EditProfilePage/>},
  
  
]);



function App() {

  return <QueryClientProvider client={queryClient}>
        <SesionContextProvider>
      <RouterProvider router={router}/>
      <ToastContainer></ToastContainer>
      </SesionContextProvider>
  </QueryClientProvider>
}

export default App
