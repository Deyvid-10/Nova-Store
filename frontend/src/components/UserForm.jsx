import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import Input from './Input'
import IsLoading from './IsLoading'
import front_page_tech from '../assets/img/Imagen-Portada.webp'
import front_page_cloth from '../assets/img/portada-ropa.jpeg'
import front_page_home from '../assets/img/Interior.jpg'

import logo from '../assets/img/LOGO.png'

import { credentials, queryClient } from '../util/requests'
import { SesionContext } from '../store/sesion-context'
import { useContext } from 'react'
import { useState } from 'react'

let avatars = [
  {img: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Aidan"},
  {img: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Eliza"},
  {img: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Brian"},
  {img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ryker"},
  {img: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Wyatt"},
  {img: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Caleb"},
  {img: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Jocelyn"},
  {img: "https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Destiny"},
  {img: "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Destiny"},
  {img: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Christopher"},
]

export default function UserForm({createAccount = false, editProfile = false}){

  const redirect = useNavigate()

  const { user } = useContext(SesionContext)

  const { data, isLoading, isSuccess } = user
  
  useEffect(()=>{
    if(data && !editProfile){
      redirect("/")      
    }

    if(!data && editProfile){
      redirect("/")      
    }

    if(isSuccess){
      queryClient.invalidateQueries({queryKey: ['cart']})       
    }

  }, [data, isSuccess])
  
  const {mutate, data: response, isPending} = useMutation(
    {
      mutationFn: credentials,
      mutationKey: [editProfile ? 'edit-profile' : createAccount ? 'signup' : 'login'],
      onSuccess: (data) => {
          
        queryClient.invalidateQueries({queryKey: ['user']})
        if(editProfile && data.error){
          toast.error(data.error)
        }
        else if(editProfile && data.message){
          toast.success(data.message)
        }
      },
      onError: () =>{

        if(createAccount){
          toast.error('Error to signup, try later')
        }
        else if(editProfile){
          toast.error('Error to edit profile, try later')
        }
        else{
          toast.error('Error to login, try later')
        }
      }
    }
  )

  function handleSubmit(event){
    
    event.preventDefault()
    
    const fd = new FormData(event.target)
    let avatar = ''
    
    
    createAccount || editProfile ? avatar = fd.getAll('avatar') : undefined
    const data = Object.fromEntries(fd.entries())
    createAccount || editProfile ? data.avatar = avatar : undefined
    
    mutate({formData: data, 
          type:  editProfile ? 'editProfile' : createAccount ? 'signup' : 'login',
          method: editProfile ? 'PUT' : 'POST'
    })
    
  }
  
  function handleSearchEnter(event){
      if(event.key === 'Enter'){
          handleSearch()
      }
  }

  const [avatarIndex, setAvatarIndex] = useState(1)

  useEffect(()=>{
    
    if(data && editProfile){
      setAvatarIndex(avatars.findIndex((avatar) => avatar.img === data[0].users_img))
    }
    else{
      setAvatarIndex(0)
    }
    
  }, [data])
  
  return (
    <section className={(createAccount || editProfile) ? 'flex flex-row-reverse h-screen' : "flex"}>
      <div className={(createAccount || editProfile) ? " overflow-y-scroll md:w-[550px] w-full flex  flex-col px-6 lg:px-8  py-12" : 
                                              "min-h-full md:w-[550px] w-full flex  flex-col px-6 lg:px-8  justify-center " }>
        {/* logo form */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <img
              alt="Logo"
              src={logo}
              className="mx-auto w-16"
            />
            <p className='font-bold text-2xl logoText text-center'>Nova <span className='text-indigo-500'>Store</span></p>
          </Link>
          <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            { editProfile ? "Edit " : createAccount ? "Sign up to" : "Log in to"}  your account
          </h2>
        </div>

        <div className={(createAccount || editProfile) ? "shadow border border-gray-100 p-5 rounded-2xl mt-7 sm:mx-auto sm:w-full max-w-full sm:max-w-md md:max-w-full" 
                                      : "shadow border border-gray-100 p-5 rounded-2xl mt-7 sm:mx-auto sm:w-full sm:max-w-sm"}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name='sdasdas'/>
            {(createAccount || editProfile) && 
              <div className='mt-2'>
                <label  className="block text-sm font-medium text-gray-900">
                  Profile photo
                </label>
                <fieldset className="mt-4">
                    <div className="grid grid-cols-5 gap-5">
                      {avatars.map((avatar, index) => (
                        
                        <label key={index} className="relative z-20 hover:cursor-pointer size-14 overflow-hidden flex rounded-lg outline outline-black/10 has-checked:outline-4 has-checked:outline-indigo-600  ">
                          <input
                            defaultValue={avatar.img}
                            checked={index === avatarIndex }
                            name="avatar"
                            type="radio"
                            // aria-label={color.name}
                            className=
                              'absolute inset-0 size-5 hover:cursor-pointer appearance-none rounded-lg '
                            onChange={() => setAvatarIndex(index)}
                          />

                            <img src={avatar.img} alt={"avatar" + index + " profile image"} />
                         
                        
                        </label>
                      ))}
                    </div>
                  </fieldset>
              </div>
                }
            {(createAccount || editProfile) && 
            
            <div className='block sm:flex sm:space-y-0 space-y-6 gap-2 justify-between'>
                <Input label={"Name"} name="name" type={"text"} defaultValue={data?.[0]?.users_name}/>
                <Input label={"Last Name"} name="last-name" type={"text"} defaultValue={data?.[0]?.users_last_name}/>
            
            </div>}
            <Input label={"Email address"} name="email" type={"email"} defaultValue={data?.[0]?.users_email}/>
            <Input label={"Password"} name="password" type={"password"} />
            {(createAccount || editProfile) && <Input label={"Confirm Password"} name="conf-password" type={"password"}  />}
            <hr className="border-t border-gray-300 my-6 mt-10" />
            {(createAccount || editProfile) &&  <Input label={"Address"} name="address" type={"text"} defaultValue={data?.[0]?.users_address} />}
            {(createAccount || editProfile) &&  <Input label={"Postal Code"} name="postal-code" type={"number"} defaultValue={data?.[0]?.users_postal_code}/>}
            
            {(createAccount || editProfile) &&  <Input label={"Phone Number"} name="phone-number" type={"tel"} defaultValue={data?.[0]?.users_phone_number} />}

            {(createAccount || editProfile) &&  <Input label={"Credit Card"} name="credit-card" type={"text"} defaultValue={data?.[0]?.['users_credit-card']} />}
            {response && "errors" in response &&
              <ul>
                {response.errorsList.map((err, index) => (
                  <div>
                    <li key={index} className='text-red-400'>- {err}</li>
                  </div>
                ))}
              </ul>
            }
            <div>
              <button
                type="submit"
                className="flex w-full h-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isPending || isLoading}
              >
                {isPending ? <IsLoading/> : editProfile ? "Edit account" : createAccount ? "Sign up" : "Log in"}
                
              </button>
            </div>
          </form>

          {!editProfile && <p className="mt-10 text-center text-sm/6 text-gray-500">
            {createAccount ? "Do you have an account already? " : "Don't you have a account? "}
            <Link to = {createAccount ? "/log-in": "/sign-up"} className="font-semibold text-indigo-600 hover:text-indigo-500">
              {createAccount ? "Click here to log in" : "Click here to sign up" }
            </Link>
          </p>}
        </div>

      </div>

      <div className="w-full h-dvh flex-1">
        <img 
        src={editProfile ? front_page_home : createAccount ? front_page_cloth : front_page_tech}
        className=" w-full h-full brightness-75 object-cover" alt="Front page" />
        
      </div>

    </section>
  )


}