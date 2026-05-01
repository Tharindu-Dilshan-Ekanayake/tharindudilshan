import React from 'react'
import AdminNav from '../../component/AdminCompo/AdminNav'
import Vlogscompo from '../../component/AdminCompo/Vlogscompo'

export default function AdminVlog() {
  return (
    <div className='flex h-screen'>
      <div className='h-full '>
        <AdminNav/>
      </div>
      <div className='flex-1 w-screen'>
        <div className='h-full px-6 pt-12 overflow-y-auto'>
          <Vlogscompo/>
        </div>
      </div>
    </div>
  )
}