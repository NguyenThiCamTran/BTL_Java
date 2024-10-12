import React from 'react';
import TableList from '../components/TableList';
import { ToastContainer } from 'react-toastify';

const TablesPage = () => {
  return (
     <div>
     <div className='border border-2 rounded-3 py-2 mb-3'>
        <h2 className='ms-3'>Quản lý tài khoản</h2>
     </div>
     <div className='border border-2 rounded-3 py-2 mb-3'>
       <p className='m-3'><TableList /></p>
       <ToastContainer />
     </div>      
   </div>
    
  );
};

export default TablesPage;
