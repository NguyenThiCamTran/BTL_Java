import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate()
  const taikhoan = localStorage.getItem("auth");
  const [user, setUser] = useState(null)
  useEffect(()=>{
    if(taikhoan){
      const value = JSON.parse(taikhoan);
      setUser(value)
    }
  }, [taikhoan])


  const handleLogout = async () => {
    const res = await axios.post(`http://localhost:8080/taikhoan/dang-xuat`)
    if(res.status === 200){
      localStorage.removeItem("auth")
      toast("Đăng xuất thành công")
      navigate("/")
    }else {
      toast("Đăng xuất thất bại")
    }
  }
  console.log(user)
  return (
    <>
      <style>
        {`
          .nav-link {
            background-color: #e6ccff; /* Light purple */
            color: black; /* Default text color */
            width: 100%; /* Full width for <li> items */
            display: block;
            padding: 15px;
            text-align: left; /* Align text to the left */
          }
          
          .nav-link:hover {
            background-color: #d1b3ff; /* Slightly darker purple on hover */
            color: white; /* White text on hover */
          }

          .nav-link.active {
            background-color: #b366ff; /* Darker purple when active */
            color: white; /* White text when active */
          }

          /* Remove margin and padding for the <ul> and <li> elements */
          .nav {
            padding-left: 0;
            list-style: none;
          }

          .nav-item {
            width: 100%; /* Full width for each nav item */
          }
        `}
      </style>
      {user && <div>
        <p className='text-center h5'>Thu Ngân: {user.tenDangNhap}</p>
        <p className='text-center h7'>Ca làm: ( {user.caLam } )</p>
        <ul className="nav" >
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/admin/tables"
          >
            Quản lý bàn
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/admin/products"
          >
            Quản lý sản phẩm
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/admin/invoices"
          >
            Quản lý hóa đơn
          </NavLink>
        </li>
        {user.loaiTaiKhoan === 'admin' && <><li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/admin/accounts"
          >
            Quản lý tài khoản
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/admin/revenue"
          >
            Quản lý doanh thu
          </NavLink>
        </li></>}
        <li className="nav-item">
          <NavLink
            className="nav-link bg-danger"
            onClick={handleLogout}
          >
            Đăng xuất
          </NavLink>
        </li>
      </ul>
      </div>
      
      }
      
    </>
  );
};

export default Header;
