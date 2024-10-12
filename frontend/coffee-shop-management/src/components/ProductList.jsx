import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ tenSanPham: '', donGia: 0, moTa: '', hinhAnh: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({ tenSanPham: '', donGia: 0, moTa: '', hinhAnh: null });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // Mới
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taiKhoanToDelete, setTaiKhoanToDelete] = useState(null);

  useEffect(() => {
    console.log(123)
    fetchProducts();
  }, []);

  

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/sanpham');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append('tenSanPham', newProduct.tenSanPham);
    formData.append('donGia', newProduct.donGia);
    formData.append('moTa', newProduct.moTa);
    formData.append('hinhAnh', newProduct.hinhAnh);

    try {
      const response = await axiosInstance.post('/sanpham/AddSanPham', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product added successfully:', response.data);
      fetchProducts();
      setNewProduct({ tenSanPham: '', donGia: 0, moTa: '', hinhAnh: null });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please check the console for details.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/sanpham/deleteSanPham?maSanPham=${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const startEdit = (product) => {
    setEditProductId(product.maSanPham);
    setEditProduct({ tenSanPham: product.tenSanPham, donGia: product.donGia, moTa: product.moTa, hinhAnh: null });
    setShowEditForm(true); // Mới
  };

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append('maSanPham', editProductId);
    formData.append('tenSanPham', editProduct.tenSanPham);
    formData.append('donGia', editProduct.donGia);
    formData.append('moTa', editProduct.moTa);
    if (editProduct.hinhAnh) {
      formData.append('hinhAnh', editProduct.hinhAnh);
    }

    try {
      await axiosInstance.put(`/sanpham/updateSanPham`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts();
      setEditProductId(null);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div>
      {/* <h1 className='text-success'>Product List</h1> */}

      <div className="d-flex justify-content-between mb-3">
        <button onClick={() => setShowAddForm(true)} className="btn btn-primary">Thêm sản phẩm</button>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Tìm kiếm sản phẩm..."
          className="form-control w-25"
        />
      </div>

      {/* Add New Product Modal */}
      {showAddForm && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-overlay" />
          <div className="modal-dialog">
            <div className="modal-content" style={{ width: '600px', height: 'auto' }}>
              <div className="modal-header">
                <h5 className="modal-title">Thêm sản phẩm mới</h5>
                <button type="button" className="close" onClick={() => setShowAddForm(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newProduct.tenSanPham}
                  onChange={(e) => setNewProduct({ ...newProduct, tenSanPham: e.target.value })}
                  placeholder="Tên sản phẩm"
                  className="form-control mb-2"
                />
                <input
                  type="number"
                  value={newProduct.donGia}
                  onChange={(e) => setNewProduct({ ...newProduct, donGia: parseFloat(e.target.value) })}
                  placeholder="Đơn giá"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={newProduct.moTa}
                  onChange={(e) => setNewProduct({ ...newProduct, moTa: e.target.value })}
                  placeholder="Mô tả"
                  className="form-control mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProduct({ ...newProduct, hinhAnh: e.target.files[0] })}
                  className="form-control mb-2"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => setShowAddForm(false)}>Hủy</button>
                <button onClick={addProduct} className="btn btn-success">Thêm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditForm && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-overlay" />
          <div className="modal-dialog">
            <div className="modal-content" style={{ width: '600px', height: 'auto' }}>
              <div className="modal-header">
                <h5 className="modal-title">Sửa sản phẩm</h5>
                <button type="button" className="close" onClick={() => setShowEditForm(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={editProduct.tenSanPham}
                  onChange={(e) => setEditProduct({ ...editProduct, tenSanPham: e.target.value })}
                  placeholder="Tên sản phẩm"
                  className="form-control mb-2"
                />
                <input
                  type="number"
                  value={editProduct.donGia}
                  onChange={(e) => setEditProduct({ ...editProduct, donGia: parseFloat(e.target.value) })}
                  placeholder="Đơn giá"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={editProduct.moTa}
                  onChange={(e) => setEditProduct({ ...editProduct, moTa: e.target.value })}
                  placeholder="Mô tả"
                  className="form-control mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditProduct({ ...editProduct, hinhAnh: e.target.files[0] })}
                  className="form-control mb-2"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => setShowEditForm(false)}>Hủy</button>
                <button onClick={updateProduct} className="btn btn-success">Lưu</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Mô tả</th>
            <th>Hình</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => product.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((product) => (
              <tr key={product.maSanPham}>
                <td>
                  {product.tenSanPham}
                </td>
                <td>
                  {product.donGia}
                </td>
                <td>
                  {product.moTa}
                </td>
                <td>
                  {product.hinhAnh && <img src={`http://localhost:8080/${product.hinhAnh}`} alt={product.tenSanPham} style={{ width: '70px', height: '70px' }} />}
                </td>
                <td className="d-flex justify-content-center gap-2">
                  <>
                      <button onClick={() => startEdit(product)} className="btn btn-warning mr-2">Sửa</button>
                      <button onClick={() => {
                        setTaiKhoanToDelete(product.maSanPham);
                        setShowDeleteModal(true);
                      }} className="btn btn-danger">Xóa</button>
                    </>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-overlay" />
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác Nhận Xóa</h5>
                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Hủy</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(taiKhoanToDelete)}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
        }
        .modal-dialog {
          position: relative;
          z-index: 1001;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
