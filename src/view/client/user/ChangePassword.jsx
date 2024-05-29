import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeaderFormUser from "./HeaderUser";
import { Link } from "react-router-dom";
import UserService from "../../../service/UserService";
import Swal from "sweetalert";

const schema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().min(6, 'New password must be at least 6 characters long').required('New password is required'),
  confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match').required('Confirm new password is required')
}).required();

export default function ChangePassword() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const userId = localStorage.getItem("id")
  const [isSaveLoading, setIsSaveLoading] = useState(false);


  const onSubmit = async data => {
    const { currentPassword, newPassword, confirmNewPassword } = data;
    setIsSaveLoading(true)
    const formData = new FormData();
    formData.append('oldPassword', currentPassword);
    formData.append('newPassword', newPassword);
    try {
      const response = await UserService.changePassword(userId,formData);
      Swal({
        title: "Success",
        text: "Cập nhật mật khẩu thành công",
        icon: "success",
        timer: 2000,
      });
      reset(); // Resets the form fields after successful submission
    } catch (error) {
      console.log(error, "error")
      Swal({
        title: "Lỗi khi cập nhật mật khẩu",
        text: error.response?.data?.message || "Failed to update password. Please try again.",
        icon: "error",
        timer: 2000,
      });
    }
    finally{
      setIsSaveLoading(false)
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
                  <Link className="a-tag-footer-div-form-user" to={"/user/account-setting"}>
                    <h2>Tài Khoản &nbsp;</h2>
                  </Link>
                  <i className="fa-solid fa-angle-right"></i>
                  <h3>&nbsp; Đổi mật khẩu</h3>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">Mật khẩu hiện tại</label>
                    <Controller
                      name="currentPassword"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="password"
                          className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                          {...field}
                        />
                      )}
                    />
                    {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword.message}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                    <Controller
                      name="newPassword"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="password"
                          className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                          {...field}
                        />
                      )}
                    />
                    {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="form-label">Xác nhận mật khẩu</label>
                    <Controller
                      name="confirmNewPassword"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          type="password"
                          className={`form-control ${errors.confirmNewPassword ? 'is-invalid' : ''}`}
                          {...field}
                        />
                      )}
                    />
                    {errors.confirmNewPassword && <div className="invalid-feedback">{errors.confirmNewPassword.message}</div>}
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
                    Cập nhật
                  </button>
                  )
                }
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
