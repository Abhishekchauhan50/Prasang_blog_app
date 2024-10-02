import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Tags from '../components/Tags'
import BlogCard from '../components/BlogCard'
import Footer from '../components/Footer'
import { usefirebase } from '../context/FirrebaseContext'
import Loading from '../components/Loading'
import Nocard from '../components/Nocard'

function BlogList() {
  const [blogListData  ,setBlogListData] = useState()
  const [blogCount, setBlogCount] = useState(0);
  const firebase = usefirebase()
  
  

  useEffect(() => {
    if (blogListData) {
      //console.log(blogListData[0]);
      setBlogCount(blogListData.length);
    }
  }, [blogListData]);

  // You can now use blogCount to display the number of blog posts
  // For example: console.log(`Number of blog posts: ${blogCount}`);
  

  useEffect(()=>{
    firebase.getData()
      .then((doc)=>setBlogListData(doc.docs))

      .catch((err)=>console.log(err))

  })





  return (
    <>
    <div className='flex flex-col justify-center items-center'>
    <Navbar/>
    <Banner/>
    <Tags/>
    <div className='flex flex-wrap gap-4 justify-center   w-full'>
    {blogListData === null ? (
      <Loading />
    ) : blogCount > 0 ? (
      blogListData.map((val, i) => (
        <BlogCard
          key={i}
          title={val.data().title}
          author={val.data().userName}
          date={val.data().createdData}
          text={val.data().blogText}
          id={i}
        />
      ))
    ) : (
      <Nocard/>
    )}
    {/* {
      (blogListData == null)? (<Loading/>)
      :
      (
        blogListData.map((val, i)=>{
          return(
            <BlogCard author = {val.data().title}
            date = {val.data().createdData}
            text = {val.data().blogText}
            id=  {i}/>
          )
        })
      )
    } */}
    </div>


    
    <Footer/>
    </div>
    </>
  )
}

export default BlogList