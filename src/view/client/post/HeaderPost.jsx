import React, { useState, useEffect } from "react";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import '../place/css/Client.css'
import logo from "../../../images/logoGoDana.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostService from "../../../service/PostService";
import { usePost } from "../../../context/PostContext";


function HeaderPost() {
  const jwtValue = localStorage.getItem("jwt");
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const {posts, setPosts, comfortableSelected, setComfortableSelected} = usePost();

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

  const getAllPostByUser = async () => {
    if (id !== null) {
      try {
        const resp = await PostService.getAllPostByUser(id);
        setPosts(resp.data);
        setComfortableSelected(null);
        setIsOpenDropMenuLoginWithJWT(false);
        
      } catch (err) {
        console.error("Lỗi khi lấy danh sách bài viết:", err);
      }
    } else {
      console.error("Id user không tồn tại");
    }
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
          <Link className="a-tag-footer-div-form-user" style={{marginRight: "50px"}} to={"/"}>
            <h4>Trang chủ</h4>
          </Link>
          <Link
            className="a-tag-footer-div-form-user"
            to={"/post"}
          >
            <h4>Bài viết</h4>
          </Link>
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
              <Link className="link-user-login" onClick={getAllPostByUser}>
                <div className="dropdown-menu-choice">Bài viết của tôi</div>
              </Link>
              <hr />
              <Link className="link-user-login" to={"/user/account-setting"}>
                <div className="dropdown-menu-choice">Tài khoản</div>
              </Link>
              <hr />
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

export default HeaderPost;
