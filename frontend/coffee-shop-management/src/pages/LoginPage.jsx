import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ onLoginSuccess }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Simulate login logic (replace this with your real login code)
    const isSuccess = true; // Simulated login success

    if (isSuccess) {
      onLoginSuccess(); // Notify App that login was successful
    }
  };

  return (
    <LoginForm/>
  );
};

export default LoginPage;
