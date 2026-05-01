import React from 'react'
import NavBar from '../component/NavBar'
import BGG from '../images/BGGICON.jpg'
import ProjectCompo from '../component/ProjectCompo'

export default function Projects() {
  return (
    <div className="min-h-screen bg-right bg-cover no-repeat bg- lg-h-screen" style={{ backgroundImage: `url(${BGG})`,}}>
        <div className='bg-white bg-opacity-50'>
            <NavBar/>
        </div>
        <div className='h-[840px] overflow-y-auto'>
          <ProjectCompo/>
        </div>
      
    </div>
  )
}
