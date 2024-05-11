import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../view/client/place/Home';
import PlaceDetail from '../view/client/place/placeDetail/PlaceDetail';
import LoginForm from '../view/client/auth/Login';
import AccountSetting from '../view/client/user/AccountSetting';
import UserInfomation from '../view/client/user/UserInformation/UserInfomation';
import PostBody from '../view/client/post/PostBody';

export default function RoutesClient() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/place/:placeId'element={<PlaceDetail/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/user/account-setting' element={<AccountSetting/>} />
        <Route path='/user/account-setting/user-infomation' element={<UserInfomation/>} />
        <Route path='post' element={<PostBody/>} />
    </Routes>
  )
}
