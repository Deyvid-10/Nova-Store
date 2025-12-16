import React from "react"

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'

import { toast, ToastContainer } from "react-toastify"
import { useContext } from "react"
import { SesionContext } from "../store/sesion-context"
import IsLoading from "./IsLoading"

export default function ConfirmOrderDialog({open, setOpenModal, total, handleOrderConfirm, pendingHistoricalAdd}){

    const {user} = useContext(SesionContext)
    
    const {data: dataUser, isLoading: userLoading, isError: isErrorUser} = user
    
    const currectDate = new Date()

    if(isErrorUser){
      toast.error("Error to get the user data")
    }

    return(
      <Dialog
        open={open}
        onClose={setOpenModal}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear" />

        <ToastContainer />

        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <DialogPanel className="translate-y-4 transition-all duration-300  mx-5 ease-out w-full lg:w-[700px] m-auto space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-white p-6 shadow-xl overflow-y-auto">

            
            {userLoading && <IsLoading/>}

            {dataUser && [
              { label: 'Date', value: currectDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) },
              { label: 'Payment Method', value: dataUser[0]['users_credit-card']},
              { label: 'Name', value: dataUser[0].users_name + " " + dataUser[0].users_last_name },
              { label: 'Address', value: dataUser[0].users_address },
              { label: 'Phone', value: dataUser[0].users_phone_number },
              { label: 'Order total', value: total},
            ].map(({ label, value }) => (
              <div key={label} className="sm:flex items-center justify-between gap-4">
                <p className="font-normal mb-1 sm:mb-0 text-gray-500">{label}</p>
                <p className="font-medium text-gray-900 sm:text-end">{value}</p>
              </div>
            ))}

            <div className="flex items-center justify-center mt-5 space-x-8">
              <button
                onClick={handleOrderConfirm}
                disabled={pendingHistoricalAdd}
                className="hover:cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-1.5 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
              >
                Confirm order
              </button>
              <button
                onClick={()=>{setOpenModal(false)}}
                className="hover:cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go back
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

    )

}