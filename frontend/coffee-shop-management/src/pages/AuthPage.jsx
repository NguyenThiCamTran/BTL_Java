import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const AuthPage = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); // Set to true to show login form first
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Mark user as authenticated
    navigate('/'); // Redirect to the home or admin page after successful login
  };

  const handleRegisterSuccess = () => {
    setIsLogin(true); // Switch to login form after successful registration
  };

  const toggleForm = () => {
    setIsLogin(!isLogin); // Switch between login and register forms
  };

  return (
    <div className="auth-page">
      {isLogin ? (
        <div className=''>
          <h1 className='text-center'>Đăng Nhập</h1>
          <LoginPage onLoginSuccess={handleLoginSuccess} />
          <p className='text-center'>
            Chưa có tài khoản?{' '}
            <button onClick={toggleForm} className="btn btn-link">
              Đăng ký ngay
            </button>
          </p>
        </div>
      ) : (
        <div>
          <h1 className='text-center'>Đăng Ký</h1>
          <RegisterPage onRegisterSuccess={handleRegisterSuccess} />
          <p className='text-center'>
            Đã có tài khoản?{' '}
            <button onClick={toggleForm} className="btn btn-link">
              Đăng nhập
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
