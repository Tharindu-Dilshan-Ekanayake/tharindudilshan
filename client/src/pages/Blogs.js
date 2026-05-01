import React from 'react'
import NavBar from '../component/NavBar'
import BlogCompo from '../component/BlogCompo'
import BGG from '../images/BGGICON.jpg'


export default function Blogs() {
  return (
    <div className="min-h-screen bg-right bg-cover no-repeat bg- lg-h-screen" style={{ backgroundImage: `url(${BGG})`,}}>
        <div className='bg-white bg-opacity-50'>
            <NavBar/>
        </div>
      <div className='h-[840px] overflow-y-auto'>
        <BlogCompo/>
      </div>
    </div>
  )
}
