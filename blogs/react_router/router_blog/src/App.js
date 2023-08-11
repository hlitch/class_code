import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import BlogPosts from './BlogPosts'
import Comments from './Comments'
import DisplayBlogposts from './DisplayBlogposts'
//import DisplayBloggers from './DisplayBloggers'
//import DisplayBlogposts from './DisplayBlogposts'
import Header from './Header'
import UserPage from './UserPage'

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route index element={<UserPage />} />
        <Route path='/bloggers/:id' element={<BlogPosts />} />
        <Route path='/comments/:id' element={<Comments />} />
        {/*<Route path='/posts/:id' element={<DisplayBlogposts />} />*/}
        <Route path="*" element={<Navigate to="/" replace="true" />} />
      </Routes>
      <Outlet/>
    </div>
  )
}
