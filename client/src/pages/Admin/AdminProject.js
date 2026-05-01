import React from 'react'
import AdminNav from '../../component/AdminCompo/AdminNav'
import ProjectCompo from '../../component/AdminCompo/ProjectCompo'

export default function AdminProject() {
  return (
    <div className='flex h-screen'>
      <div className='h-full '>
        <AdminNav/>
      </div>
      <div className='flex-1 '>
        <div className='h-full px-6 pt-12 overflow-y-auto'>
          <ProjectCompo/>
        </div>
      </div>
    </div>
  )
}
