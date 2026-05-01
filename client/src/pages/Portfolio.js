import React from 'react'
import NavBar from '../component/NavBar'
import PortfolioCompo from '../component/PortfolioCompo'
import BGPORT from '../images/BGGICON.jpg'


export default function Portfolio() {
  return (
    <div className="min-h-screen bg-right bg-cover no-repeat bg- lg-h-screen" style={{ backgroundImage: `url(${BGPORT})` }}>
        <div className='bg-white bg-opacity-50'>
            <NavBar/>
        </div>
      <div>
        <PortfolioCompo/>
      </div>
    </div>
  )
}
