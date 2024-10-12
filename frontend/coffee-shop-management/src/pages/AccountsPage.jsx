import React from 'react';
import TaiKhoanList from '../components/TaiKhoanList';

const AccountsPage = () => {
  return (
    <div>
      <div className='border border-2 rounded-3 py-2 mb-3'>
         <h2 className='ms-3'>Quản lý tài khoản</h2>
      </div>
      <div className='border border-2 rounded-3 py-2 mb-3'>
        <p className='m-3'><TaiKhoanList /></p>
      </div>      
    </div>
  );
};

export default AccountsPage;
