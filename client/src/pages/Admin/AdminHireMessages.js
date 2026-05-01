import React from 'react'
import AdminNav from '../../component/AdminCompo/AdminNav'
import AdminHirecompo from '../../component/AdminCompo/AdminHirecompo'

export default function AdminHireMessages() {
  return (
    <div className='flex h-screen'>
      <div className='h-full '>
        <AdminNav/>
      </div>
      <div className='flex-1 '>
        <div className='h-full px-6 pt-12 overflow-y-auto'>
          <AdminHirecompo/>
        </div>
      </div>
    </div>
  )
}
