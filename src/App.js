import React from 'react'
import { Landing, Register, Error, ProtectedRoute } from './pages'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {AddJob, AllJobs, Profile, Stats, SharedLayout} from './pages/dashboard'



export default function App() {
  return (
    
    <BrowserRouter> 
      <Routes>

        <Route path='/' element={
          <ProtectedRoute>
              <SharedLayout/>
          </ProtectedRoute>
        
        }>
          <Route index element={<Stats/>}></Route>
          <Route path='/all-clients'element={<AllJobs/>}></Route>
          <Route path='/add-client' element={<AddJob/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Route> 

        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/landing' element={<Landing />} ></Route>
        <Route path='*' element={<Error/>} ></Route>

      </Routes>
    </BrowserRouter>
   

  )
}