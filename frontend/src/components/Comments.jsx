import {StarIcon} from '@heroicons/react/24/solid'
import React, { useState }  from 'react'
import { addComment, queryClient } from '../util/requests'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'



export default function Comments({product, idItem}){
    console.log(product);
    
    const [replyForm, setReplyForm] = useState(false)

    function showReplyForm(){
        setReplyForm(prev =>(!prev))
        
    }    

    const {mutate: mutateComment, isPending: commentIsPending, isError: commentIsError} = useMutation(
        {
            mutationFn: addComment,
            onSuccess: (data) => {
            
            queryClient.invalidateQueries({queryKey: ['products', { product_id: idItem }]})
            if(data.errors){
                 toast.error(data.error)
            }
            
            if(!data){

                toast.error("You are no logged")
            }
            },
            onError: () =>{

                toast.error('The comment could not be submited, try later')
                
            }
        }
    )

    function handleCommentSubmit(event){
        event.preventDefault()
    
        const fd = new FormData(event.target)

        const data = Object.fromEntries(fd.entries())
        data.rate = data.rate
        data.date = new Date().toISOString().slice(0, 19).replace("T", " ")
        data.product_id = idItem

        mutateComment({comment: data})

        if(commentIsError){
            eve
        }
        
    }

    

    return(
        <>
            <form onSubmit={handleCommentSubmit} className='flex flex-col gap-3'>
                <textarea name="comment" 
                        id="comment"
                        rows={3}
                        placeholder='Write a comment...'
                        className='w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 '
                        required
                ></textarea>
                <div className='flex items-center gap-2'>
                    <StarIcon aria-hidden="true"
                      className={ 'fill-amber-300 size-6 shrink-0 border-amber-300' 
                      }/>
                    <select name='rate' defaultValue={"0"} className="rounded-md w-14 bg-white px-3 py-1.5 hover:cursor-pointer text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button disabled={commentIsPending} className="mb-10 mt-1 w-36 rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >Post comment</button>
            </form>

            {
            
            product.comments.map((comment, index)=>
            <div key={index} className='border-b mt-3 border-gray-200 pb-5'>
                <div className='flex items-center gap-2'>
                    <figure className='size-8 rounded-full overflow-hidden'>
                        <img 
                            src={comment.user_img}
                            className='object-cover w-full'
                            alt="avatar" />
                    </figure>
                    <h6 className='font-semibold text-gray-950'>{comment.user_name} {" "} {comment.user_last_name}</h6>
                    <p className='text-gray-500'>{new Date(comment.date).toLocaleDateString('en-US', {month: "short", day: "numeric", year: "numeric"})}</p>
                </div>
                <div className="flex items-center mt-2">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={
                        comment.rate > rating ? 'fill-amber-300 size-5 shrink-0 border-transparent' : 'text-gray-200 size-5 shrink-0'
                      }
                    />
                  ))}
                </div>
                <p className='mt-2 ml-1 text-gray-800 whitespace-pre-line'>      
                    {comment.comment}            
                </p>
                {/* <button className='flex items-center gap-1 mt-4 text-gray-800 hover:text-gray-950'
                        onClick={showReplyForm}
                        >
                    <ChatBubbleLeftRightIcon className='size-4'/>
                    <p>Reply</p>
                </button> */}
                {/* {replyForm && <form className='ml-10 mt-5'>
                    <textarea name="comment" 
                            id="comment"
                            rows={1}
                            placeholder='Write a comment...'
                            className='w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 '
                            required
                    ></textarea>
                    
                    <button className="mt-1 rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                            
                    >Post reply</button>
                </form>} */}

                {/* <div className='ml-10 mt-10'>
                    <div className='flex items-center gap-2'>
                        <figure className='size-8 rounded-full overflow-hidden'>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtWBVfAYfadoSkWDVFTm_TdTD-8me4oTwog&s"
                                className='object-cover w-full'
                                alt="avatar" />
                        </figure>
                        <h6 className='font-semibold text-gray-950'>Deurys Marmolejo</h6>
                        <p className='text-gray-500'>Feb. 28, 2022</p>
                    </div>
                    <p className='mt-2 ml-1 text-gray-800'>Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.</p>
                </div> */}

            </div>)
            }

            {product.comments.length === 0 && <p className='font-medium text-xl text-center'>No comments</p>}
        </>
    )
}