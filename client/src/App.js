import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Portfolio from './pages/Portfolio';
import Projects from './pages/Projects';
import Vlogs from './pages/Vlogs';
import Blogs from './pages/Blogs';
import Skills from './pages/Skills';
import Adminlogin from './pages/Admin/Adminlogin';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import AdminDash from './pages/Admin/AdminDash';
import AdminPortfolio from './pages/Admin/AdminPortfolio';
import AdminVlog from './pages/Admin/AdminVlog';
import AdminBlog from './pages/Admin/AdminBlog';
import AdminProject from './pages/Admin/AdminProject';
import AdminHireMessages from './pages/Admin/AdminHireMessages';
import AdminSkills from './pages/Admin/AdminSkills';
import ProtectedRoute from './component/ProtectedRoute';
import AdminCV from './pages/Admin/AdminCV';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000');
axios.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Toaster position='bottom-right' toastOptions={{ duration: 3000 }}></Toaster>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/portfolio' element={<Portfolio/>} /> 
          <Route path='/projects' element={<Projects/>} />  
          <Route path='/vlogs' element={<Vlogs/>} />  
          <Route path='/blogs' element={<Blogs/>} />  
          <Route path='/skills' element={<Skills/>} />   

          <Route path='/adminlogin' element={<Adminlogin/>}/>

          <Route path='/admindash' element={<ProtectedRoute><AdminDash/></ProtectedRoute>}/>
          <Route path='/adminportfolio' element={<ProtectedRoute><AdminPortfolio/></ProtectedRoute>}/>
          <Route path='/admincv' element={<ProtectedRoute><AdminCV/></ProtectedRoute>}/>
          <Route path='/adminvlog' element={<ProtectedRoute><AdminVlog/></ProtectedRoute>}/>
          <Route path='/adminblog' element={<ProtectedRoute><AdminBlog/></ProtectedRoute>}/>
          <Route path='/adminprojects' element={<ProtectedRoute><AdminProject/></ProtectedRoute>}/>
          <Route path='/adminhire' element={<ProtectedRoute><AdminHireMessages/></ProtectedRoute>}/>
          <Route path='/adminskills' element={<ProtectedRoute><AdminSkills/></ProtectedRoute>}/>
        
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
