import React from 'react'
import NavBar from '../component/NavBar'
import BGG from '../images/BGGICON.jpg'
import BGMobile from '../images/ss.jpg'
import VlogCompo from '../component/VlogCompo'

export default function Vlogs() {
  return (
    <div className="min-h-screen page-bg bg-right bg-cover no-repeat bg- lg-h-screen" style={{ backgroundImage: `url(${BGG})`,}}>
        <style jsx>{`
          @media (max-width: 768px) {
            .page-bg {
              background-image: url(${BGMobile}) !important;
            }
          }
        `}</style>
        <div className='bg-white bg-opacity-50'>
            <NavBar/>
        </div>
        <div className='h-[840px] overflow-y-auto'>
          <VlogCompo/>
      </div>
    </div>
  )
}
