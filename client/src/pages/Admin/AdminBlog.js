import React from 'react'
import AdminNav from '../../component/AdminCompo/AdminNav'
import BlogsCompo from '../../component/AdminCompo/BlogsCompo'

export default function AdminBlog() {
  return (
    <div className='flex h-screen'>
      <div className='h-full '>
        <AdminNav/>
      </div>
      <div className='flex-1 '>
        <div className='h-full px-6 pt-12 overflow-y-auto'>
          <BlogsCompo/>
          </div>
      </div>
    </div>
  )
}
