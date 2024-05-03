import React, { useState, useEffect } from "react";
import "../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../css/Client.css";
import logo from "../../../../images/logoGoDana.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePlace } from "../../../../context/PlaceContext";
import FavouriteService from "../../../../service/FavouriteService";
import { ToastContainer, toast } from "react-toastify";


function Header() {
  const { searchValue, setSearchValue } = usePlace();
  const jwtValue = localStorage.getItem("jwt");
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  const id = localStorage.getItem("id");
  const { placeLiked, setPlaceLiked, setPlaceList } = usePlace();
  const navigate = useNavigate();

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
    window.location.reload();
    navigate("/", { replace: true });
  };

  const getFavoriteList = async () => {
    if (id !== null) {
      try {
        const resp = await FavouriteService.getFavouriteListByUser(id);
        if(resp.status === 204) {
          toast.error("Tài khoản hiện tại không có danh sách yêu thích nào", {
            className: "custom-toast-create-new-wish-list-success",
          });
          setIsOpenDropMenuLoginWithJWT(false);
        }
        else{
          setPlaceLiked(resp.data);
          const likedPlaceIds = placeLiked.map((item) => item.place);
          setPlaceList(likedPlaceIds);
          setIsOpenDropMenuLoginWithJWT(false);
        }
        
      } catch (err) {
        console.error("Lỗi khi lấy danh sách yêu thích:", err);
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
          width="100px"
          height="100px"
        />
        </Link>
        
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="search-button" type="submit">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
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
              <Link className="link-user-login" onClick={getFavoriteList}>
                <div className="dropdown-menu-choice">Danh sách yêu thích</div>
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

              <div className="dropdown-menu-choice">Đăng ký</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
