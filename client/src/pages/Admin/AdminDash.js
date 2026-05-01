import React from 'react'
import AdminNav from '../../component/AdminCompo/AdminNav'
import AdminDashCompo from '../../component/AdminCompo/AdminDashCompo'

export default function AdminDash() {
  return (
    <div className='flex'>
      <div className=''>
        <AdminNav/>
      </div>
      <div className='w-screen'>
        <AdminDashCompo/>
      </div>
      
    </div>
  )
}
