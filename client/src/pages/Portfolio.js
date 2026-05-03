import React from 'react'
import NavBar from '../component/NavBar'
import PortfolioCompo from '../component/PortfolioCompo'
import BGPORT from '../images/BGGICON.jpg'
import BGMobile from '../images/ss.jpg'


export default function Portfolio() {
  return (
    <div className="min-h-screen page-bg bg-right bg-cover no-repeat bg- lg-h-screen" style={{ backgroundImage: `url(${BGPORT})` }}>
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
      <div>
        <PortfolioCompo/>
      </div>
    </div>
  )
}
