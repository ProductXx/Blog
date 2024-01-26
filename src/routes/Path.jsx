import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import Profile from '../pages/Profile'
import CreateBlog from '../pages/CreateBlog'
import AllUsers from '../pages/AllUsers'
import EditUser from '../pages/EditUser'

const Path = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/detail/:title' element={<Detail/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/create' element={<CreateBlog/>}/>
        <Route path='/users' element={<AllUsers/>}/>
        <Route path='/editUser' element={<EditUser/>}/>
    </Routes>
  )
}

export default Path