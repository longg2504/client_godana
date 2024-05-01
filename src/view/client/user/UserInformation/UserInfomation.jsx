import React, { useState, useEffect, useRef } from "react";
import HeaderFormUser from "../HeaderUser";
import { Link } from "react-router-dom";
import UserService from "../../../../service/UserService";
import Swal from "sweetalert";

export default function UserInfomation() {
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const avatar = localStorage.getItem("avatar");
  const [previewImage, setPreviewImage] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(avatar);
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
    avatar: null,
  });
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const fileInputRef = useRef(null);
  useEffect(() => {
    // Lấy dữ liệu từ localStorage và cập nhật state
    const userData = {
      fullname: name,
      email: email,
      avatar: avatar,
    };
    if (userData) {
      setUserInfo(userData);
    }
  }, [name, email, avatar]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setCurrentAvatar(previewUrl);
      setUserInfo((prevState) => ({ ...prevState, avatar: file }));
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  useEffect(() => {
    setCurrentAvatar(avatar); // Nơi avatar là URL hình ảnh từ server hoặc localStorage
  }, [avatar]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaveLoading(true);
    try {
      if (userInfo.avatar == avatar) {
        const data = {
          fullname: userInfo.fullname,
          email: userInfo.email,
        };
        const res = await UserService.updateUser(id, data);
        localStorage.setItem("name", res.data.fullName);
        localStorage.setItem("email", res.data.email);
        Swal({
          title: "Thông báo!",
          text: "Cập nhật thành công!",
          icon: "success",
          timer: 1000,
        });
      } else {
        const res = await UserService.updateUser(id, userInfo);
        localStorage.setItem("name", res.data.fullName);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem(
          "avatar",
          res.data.avatar?.fileUrl ? res.data.avatar?.fileUrl : ""
        );
        Swal({
          title: "Thông báo!",
          text: "Cập nhật thành công!",
          icon: "success",
          timer: 1000,
        });
      }
    } catch (error) {
    } finally {
      setIsSaveLoading(false);
      if (fileInputRef.current && userInfo.avatar) {
        fileInputRef.current.value = "";
        setCurrentAvatar(null);
      }
    }
  };

  return (
    <>
      <HeaderFormUser />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <div className="d-flex align-items-center">
                  <Link
                    className="a-tag-footer-div-form-user"
                    to={"/user/account-setting"}
                  >
                    <h2>Tài khoản &nbsp;</h2>
                  </Link>
                  <i className="fa-solid fa-angle-right"></i>
                  <h3>Thông tin cá nhân</h3>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Tên người dùng
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={username}
                      style={{ opacity: 0.5 }}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      value={userInfo.fullname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">
                      Avatar
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="form-control"
                      id="avatar"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {currentAvatar && (
                      <img
                        src={currentAvatar}
                        alt="Avatar Preview"
                        className="img-thumbnail mt-2"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </div>
                  {isSaveLoading ? (
                    <div className="loadingio-spinner-ellipsis-ilx1jirdsl">
                      <div className="ldio-qk6putkpoq">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-success">
                      Cập nhật thông tin
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
