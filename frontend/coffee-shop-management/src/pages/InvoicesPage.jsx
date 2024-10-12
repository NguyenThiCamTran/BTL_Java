import React from 'react';
import InvoiceList from '../components/InvoiceList';

const InvoicesPage = () => {
  return (
    <div>
    <div className='border border-2 rounded-3 py-2 mb-3'>
       <h2 className='ms-3'>Quản lý hóa đơn</h2>
    </div>
    <div className='border border-2 rounded-3 py-2 mb-3'>
      <InvoiceList />
    </div>      
  </div>
  );
};

export default InvoicesPage;
