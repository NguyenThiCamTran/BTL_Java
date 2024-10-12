import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginForm = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/taikhoan/dang-nhap', {
        tenDangNhap,
        matKhau,
      });

      if (response.status === 200) {
        const taikhoan = response.data.taikhoan;
        localStorage.setItem("auth", JSON.stringify(taikhoan));
        navigate("/admin/tables")
      }
    } catch (error) {
      toast("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className='d-flex justify-content-center '>
      <form onSubmit={handleSubmit} className="container mt-4" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label htmlFor="tenDangNhap" className="form-label fw-bold">Tên đăng nhập</label>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="form-control"
            value={tenDangNhap}
            onChange={(e) => setTenDangNhap(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tenDangNhap" className="form-label fw-bold">Mật khẩu</label>
          <input
            type="password"
            placeholder="Mật khẩu"
            className="form-control"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Đăng Nhập</button>
        <ToastContainer />
      </form>
    </div>

  );
};

export default LoginForm;
