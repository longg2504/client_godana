import React, { useState, useEffect } from "react";
import "../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../css/Client.css";
import logo from "../../../../images/logoGoDana.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePlace } from "../../../../context/PlaceContext";



function HeaderDetail(prop) {
  const jwtValue = localStorage.getItem("jwt");
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const placeName = prop.placeName

  const [isOpenDropMenuLogin, setIsOpenDropMenuLogin] = useState(false);
  const [isOpenDropMenuLoginWithJWT, setIsOpenDropMenuLoginWithJWT] =
    useState(false);

  const handleOpenMenuDropdownLoginWithJWT = () => {
    setIsOpenDropMenuLoginWithJWT(!isOpenDropMenuLoginWithJWT);
  };

  const handleOpenMenuDropdownLogin = () => {
    setIsOpenDropMenuLogin(!isOpenDropMenuLogin);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("roles");
    localStorage.removeItem('name')

    window.location.reload();
    navigate("/", { replace: true });
  };


  return (
    <>
      <div className="header">
        <Link to={"/"}>
        <img
          className="img-header"
          src={logo}
          alt=""
          width="50px"
          height="100px"
        />
        </Link>

        <div className="d-flex align-items-center justify-content-center">
          <Link className="a-tag-footer-div-form-user" to={"/"}>
            <h4>Trang chủ  &nbsp;</h4>
          </Link>
          <i className="fa-solid fa-angle-right"></i>
            <h4>&nbsp; {placeName}</h4>
        </div>
        
       

        <div className="header-2">
          {jwtValue && jwtValue ? (
            username && avatar ? (
              <div className="btn-info"  onClick={handleOpenMenuDropdownLoginWithJWT}>
                <img
                 
                  className="avatar-login"
                  src={
                    avatar
                      ? avatar
                      : "https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                  }
                  alt=""
                  style={{ margin: "4px" }}
                />
                <span>{username}</span>
              </div>
            ) : (
              <div
                className="btn-info"
                onClick={handleOpenMenuDropdownLoginWithJWT}
              >
                <img
                  className="avatar-login"
                  src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                  alt=""
                  style={{ margin: "4px" }}
                />
                <span>{username}</span>
              </div>
            )
          ) : (
            <div className="btn-info">
              <span
                onClick={handleOpenMenuDropdownLogin}
                style={{ margin: "2px" }}
              >
                <i className="fa-solid fa-circle-user" />
              </span>
              <span>{username}</span>
            </div>
          )}

          {isOpenDropMenuLoginWithJWT && (
            <div className="dropdown-menu-login">
              <Link className="link-user-login" to={"/user/account-setting"}>
                <div className="dropdown-menu-choice">Tài khoản</div>
              </Link>
              <div onClick={handleLogOut} className="dropdown-menu-choice">
                Đăng xuất
              </div>
            </div>
          )}

          {isOpenDropMenuLogin && (
            <div className="dropdown-menu-login">
              <Link to={`/login`} className="link-user-login">
                <div className="dropdown-menu-choice">Đăng nhập</div>
              </Link>
              <Link to={`/signup`} className="link-user-login">
              <div className="dropdown-menu-choice">Đăng ký</div>

              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HeaderDetail;
