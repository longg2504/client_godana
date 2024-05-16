import React from 'react'
import "./User.css"
import HeaderFormUser from './HeaderUser'
import { Link } from 'react-router-dom'

const AccountSetting = () => {
    const name = localStorage.getItem('name')
    const email = localStorage.getItem('email')
    return (
        <>
            <HeaderFormUser />
            <div className='div-account-setting-form-user'>
                <div>
                    <h1>Tài khoản</h1>
                    <h3>{email}</h3>
                </div>
                <div className='choices-in-account-setting-div'>
                    <Link className='link-to-choice-account-setting' to={"/user/account-setting/user-infomation"}>
                        <div className='choice-account-setting'>
                            <div className='svg-account-setting-div'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false"
                                    style={{ display: "block", height: "40px", width: "40px", fill: "currentcolor" }}>
                                    <path d="M29 5a2 2 0 0 1 2 1.85V25a2 2 0 0 1-1.85 2H3a2 2 0 0 1-2-1.85V7a2 2 0 0 1 1.85-2H3zm0 2H3v18h26zm-3 12v2h-8v-2zm-16-8a3 3 0 0 1 2.5 4.67A5 5 0 0 1 15 20h-2a3 3 0 0 0-2-2.83V14a1 1 0 0 0-2-.12v3.29A3 3 0 0 0 7 20H5a5 5 0 0 1 2.5-4.33A3 3 0 0 1 10 11zm16 4v2h-8v-2zm0-4v2h-8v-2z">
                                    </path>
                                </svg>
                            </div>
                            <div className='details-choice-in-account-setting-div'>
                                <h3>Thông tin cá nhân</h3>
                                <p>Cung cấp thông tin cá nhân và cách chúng tôi có thể liên hệ với bạn</p>
                            </div>
                        </div>
                    </Link>
                    <Link className='link-to-choice-account-setting' to={"/user/account-setting/change-password"}>
                        <div className='choice-account-setting'>
                            <div className='svg-account-setting-div'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false"
                                    style={{ display: "block", height: "40px", width: "40px", fill: "currentcolor" }}>
                                    <path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z">
                                    </path>
                                </svg>
                            </div>
                            <div className='details-choice-in-account-setting-div'>
                                <h3>Đăng nhập và bảo mật</h3>
                                <p>Cập nhật mật khẩu</p>
                            </div>
                        </div>
                    </Link>
                    

                </div>
            </div>
        </>

    )
}

export default AccountSetting