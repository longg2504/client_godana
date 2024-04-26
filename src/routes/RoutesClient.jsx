import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../view/client/layout/Home';
import PlaceDetail from '../view/client/layout/placeDetail/PlaceDetail';

export default function RoutesClient() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/place/:placeId'element={<PlaceDetail/>}/>
    </Routes>
  )
}
