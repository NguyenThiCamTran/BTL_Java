import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const RegisterForm = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [caLam, setCaLam] = useState('sáng'); // Default to 'sáng'
  const [errorMessage, setErrorMessage] = useState('');
  const [loaiTaiKhoan, setLoaiTaiKhoan] = useState('user');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    try {
      const response = await axios.post('http://localhost:8080/taikhoan/dang-ky', {
        tenDangNhap,
        matKhau,
        caLam,
        loaiTaiKhoan
      });

      if (response.status === 200) {
        toast('Đăng ký thành công');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Tên đăng nhập đã tồn tại'); // Display error message
      } else {
        setErrorMessage('Đăng ký thất bại'); // General error message
        toast('Đăng ký thất bại', error);
      }
    }
  };

  return (
    <div className='d-flex justify-content-center' >
      <form onSubmit={handleSubmit} className="container mt-4" style={{ maxWidth: "500px" }}>
      <div className="mb-3">
        <label htmlFor="tenDangNhap" className="form-label fw-bold">Tên đăng nhập</label>
        <input
          type="text"
          id="tenDangNhap"
          className="form-control"
          placeholder="Tên đăng nhập"
          value={tenDangNhap}
          onChange={(e) => setTenDangNhap(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="matKhau" className="form-label fw-bold">Mật khẩu</label>
        <input
          type="password"
          id="matKhau"
          className="form-control"
          placeholder="Mật khẩu"
          value={matKhau}
          onChange={(e) => setMatKhau(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="caLam" className="form-label fw-bold">Ca làm</label>
        <select
          id="caLam"
          className="form-select"
          value={caLam}
          onChange={(e) => setCaLam(e.target.value)}
          required
        >
          <option value="sáng">Sáng</option>
          <option value="trưa">Trưa</option>
          <option value="chiều">Chiều</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Đăng Ký</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
      <ToastContainer />
    </form>
    </div>
  );
};

export default RegisterForm;
