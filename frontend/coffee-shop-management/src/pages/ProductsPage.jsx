import React from 'react';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
  return (
    <div>
    <div className='border border-2 rounded-3 py-2 mb-3'>
       <h2 className='ms-3'>Quản lý sản phẩm</h2>
    </div>
    <div className='border border-2 rounded-3 py-2 mb-3'>
      <p className='m-3'><ProductList /></p>
    </div>      
  </div>
  );
};

export default ProductsPage;
