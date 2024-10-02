

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { usefirebase } from '../context/FirrebaseContext'

function AddPost() {
    const [title, setTitle] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [blogText, setBlogText] = useState('')
    const firebase = usefirebase()
    const navigate = useNavigate()

    const handleAddBlog = () => {
        firebase.AddBlog(title, imageURL, blogText)
        navigate('../')
    }

    return (
        <>
            <div className="fixed top-0 right-0 flex justify-end py-5 text-4xl text-zinc-200 px-5">
                <NavLink to={'../'}>
                    <i className="ri-close-line hover:text-red-500 transition duration-300"></i>
                </NavLink>
            </div>
            <div className="  w-full h-screen bg-zinc-900 flex flex-col justify-center items-center">
                <h1 className="text-5xl py-4 font-bold text-zinc-700">Add Your Blog</h1>
                <div className="flex flex-col gap-6 bg-white shadow-lg p-10 rounded-lg w-[25rem]">
                    <div className="flex flex-col  gap-2">
                        <label className="font-medium text-zinc-600" htmlFor="">Add Title</label>
                        <input 
                            onChange={e => setTitle(e.target.value)} 
                            value={title} 
                            className="p-3 rounded-lg outline-none border border-zinc-300 focus:border-blue-500 transition duration-300 text-zinc-800" 
                            type="text" 
                            placeholder="Enter your Title" 
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label className="font-medium text-zinc-600" htmlFor="">Add Image</label>
                        <div className="bg-zinc-100 rounded-lg px-3 py-2">
                            <input 
                                onChange={e => setImageURL(e.target.files[0])} 
                                className="p-2 w-full text-zinc-800" 
                                type="file" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-zinc-600" htmlFor="">Add your Thoughts</label>
                        <textarea 
                            onChange={e => setBlogText(e.target.value)} 
                            value={blogText} 
                            className="rounded-lg outline-none border border-zinc-300 focus:border-blue-500 transition duration-300 h-40 p-3 font-mono text-zinc-800 resize-none" 
                            placeholder="Share your thoughts..." 
                        />
                    </div>
                    <div className="flex justify-center">
                        <button 
                            onClick={handleAddBlog} 
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-md px-6 py-2.5 transition duration-300">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPost
