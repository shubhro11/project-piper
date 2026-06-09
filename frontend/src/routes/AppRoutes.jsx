import React from 'react'
import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import Home from "../pages/Home";
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

const AppRoutes = () => {
  return (
    <Routes>

      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Register />} />


      <Route path="/home" element={<Home />} />
      <Route path="*" element={<Page404 />} />


    </Routes>
  )
}

export default AppRoutes