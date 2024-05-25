import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../view/client/place/Home';
import PlaceDetail from '../view/client/place/placeDetail/PlaceDetail';
import LoginForm from '../view/client/auth/Login';
import AccountSetting from '../view/client/user/AccountSetting';
import UserInfomation from '../view/client/user/UserInformation/UserInfomation';
import PostBody from '../view/client/post/PostBody';
import SignUp from '../view/client/auth/SignUp';
import ChangePassword from '../view/client/user/ChangePassword';
import NotFoundPage from '../view/client/NotFoundPage';

export default function RoutesClient() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/place/:placeId'element={<PlaceDetail/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/user/account-setting' element={<AccountSetting/>} />
        <Route path='/user/account-setting/user-infomation' element={<UserInfomation/>} />
        <Route path='user/account-setting/change-password' element={<ChangePassword/>} />
        <Route path='post' element={<PostBody/>} />
        <Route path="*" element={<NotFoundPage />} /> {/* Add NotFound route */}
    </Routes>
  )
}
