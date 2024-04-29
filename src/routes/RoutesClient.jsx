import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../view/client/place/Home';
import PlaceDetail from '../view/client/place/placeDetail/PlaceDetail';
import LoginForm from '../view/client/auth/Login';

export default function RoutesClient() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/place/:placeId'element={<PlaceDetail/>}/>
        <Route path='/login' element={<LoginForm/>}/>
    </Routes>
  )
}
