import React from 'react'
import { NavLink } from 'react-router-dom'

function BlogCard(props) {
  
  return (
    <>
    
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg p-6 my-10 bg-gray-800">
      <div className="mb-4">
        <span className="text-green-500 font-bold text-lg">{props.title}</span><br />
        <span className="text-gray-100 text-sm ml-2">{props.author}</span>
        <span className="text-slate-500 text-sm ml-2">{props.date}</span>
      </div>
      <p className="text-gray-300 text-base line-clamp-3 overflow-hidden mb-4">
        {props.text}
      </p>
      <div className="flex  justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <NavLink to={`/blogpost/${props.id}`}>View</NavLink>
        </button>
       
      </div>
    </div>
    </>
  )
}

export default BlogCard
