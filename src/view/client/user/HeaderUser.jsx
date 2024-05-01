import React, { useState, useRef } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logoGoDana.png";

const HeaderFormUser = () => {
  const navigate = useNavigate();
  var jwtValue = localStorage.getItem("jwt");
  const avatar = localStorage.getItem("avatar");
  const username = localStorage.getItem("username");

  const [isOpenDropMenuLoginWithJWT, setIsOpenDropMenuLoginWithJWT] =
    useState(false);

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("roles");
        navigate("/", { replace: true });
        window.location.reload();
      };

  const handleOpenMenuDropdownLoginWithJWT = () => {
    setIsOpenDropMenuLoginWithJWT(!isOpenDropMenuLoginWithJWT);
  };

  // console.log("userInfo", userInfo);
  const imgRef = useRef(null);

  return (
    <>
      <div className="div-header-form-user">
        <Link to={"/"}>
            <img className="img-header" ref={imgRef} src={logo} alt="" />
        </Link>

        <div className="header-2">
          {jwtValue && jwtValue ? (
            username && avatar ? (
              <div className="btn-info-user" onClick={handleOpenMenuDropdownLoginWithJWT}>
                <img
                  
                  className="avatar-login"
                  src={avatar}
                  alt=""
                />
                <span>{username}</span>
              </div>
            ) : (
              <div  className="btn-info-user" onClick={handleOpenMenuDropdownLoginWithJWT}>
                <img
                  className="avatar-login"
                  src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                  alt=""
                />
                <span>{username}</span>
              </div>
            )
          ) : (
            <div className="btn-info-user" onClick={handleOpenMenuDropdownLoginWithJWT}>
              <span>
                <i className="fa-solid fa-circle-user" />
              </span>
              <span>{username}</span>
            </div>
          )}

          {isOpenDropMenuLoginWithJWT && (
            <div className="dropdown-menu-login-user">
              <div onClick={handleLogOut} className="dropdown-menu-choice">
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="r-form-user" />
    </>
  );
};

export default HeaderFormUser;
