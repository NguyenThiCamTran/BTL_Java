import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const TaiKhoanList = () => {
  const [taiKhoans, setTaiKhoans] = useState([]);
  const [newTaiKhoan, setNewTaiKhoan] = useState({ tenDangNhap: '', matKhau: '', loaiTaiKhoan: '', caLam: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editTaiKhoanId, setEditTaiKhoanId] = useState(null);
  const [editTaiKhoan, setEditTaiKhoan] = useState({ tenDangNhap: '', matKhau: '', loaiTaiKhoan: '', caLam: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [taiKhoanToDelete, setTaiKhoanToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchTaiKhoans();
  }, []);

  const fetchTaiKhoans = async () => {
    const response = await axiosInstance.get('/taikhoan');
    setTaiKhoans(response.data);
  };

  const addTaiKhoan = async () => {
    await axiosInstance.post('/taikhoan/dang-ky', newTaiKhoan);
    fetchTaiKhoans();
    setNewTaiKhoan({ tenDangNhap: '', matKhau: '', loaiTaiKhoan: '', caLam: '' });
    setShowAddModal(false);
  };

  const deleteTaiKhoan = async (id) => {
    try {
      await axiosInstance.delete(`/taikhoan/deleteTaiKhoan?maTaiKhoan=${id}`);
      fetchTaiKhoans();
      setTaiKhoanToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const startEdit = (taiKhoan) => {
    setEditTaiKhoanId(taiKhoan.maTaiKhoan);
    setEditTaiKhoan({ ...taiKhoan }); // Copy the taiKhoan to the editTaiKhoan state
  };

  const updateTaiKhoan = async () => {
    const updatedTaiKhoan = { ...editTaiKhoan, maTaiKhoan: editTaiKhoanId };
    console.log(updatedTaiKhoan)
    await axiosInstance.put(`/taikhoan/updateTaiKhoan`, updatedTaiKhoan);
    fetchTaiKhoans();
    setEditTaiKhoanId(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">Thêm Tài Khoản</button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Tìm kiếm tài khoản..."
          className="form-control w-25"
        />
      </div>

      {/* Add New Account Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-overlay" />
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm Tài Khoản</h5>
                <button type="button" className="close" onClick={() => setShowAddModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Tên Đăng Nhập"
                  value={newTaiKhoan.tenDangNhap}
                  onChange={(e) => setNewTaiKhoan({ ...newTaiKhoan, tenDangNhap: e.target.value })}
                  className="form-control mb-2"
                />
                <input
                  type="password"
                  placeholder="Mật Khẩu"
                  value={newTaiKhoan.matKhau}
                  onChange={(e) => setNewTaiKhoan({ ...newTaiKhoan, matKhau: e.target.value })}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  placeholder="Loại Tài Khoản"
                  value={newTaiKhoan.loaiTaiKhoan}
                  onChange={(e) => setNewTaiKhoan({ ...newTaiKhoan, loaiTaiKhoan: e.target.value })}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  placeholder="Ca Làm"
                  value={newTaiKhoan.caLam}
                  onChange={(e) => setNewTaiKhoan({ ...newTaiKhoan, caLam: e.target.value })}
                  className="form-control mb-2"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Hủy</button>
                <button type="button" className="btn btn-primary" onClick={addTaiKhoan}>Thêm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tai Khoan Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên Đăng Nhập</th>
            <th>Loại Tài Khoản</th>
            <th>Mật khẩu</th>
            <th>Ca Làm</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {taiKhoans
            .filter((taiKhoan) => taiKhoan.tenDangNhap.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((taiKhoan) => (
              <tr key={taiKhoan.maTaiKhoan}>
                <td>
                  {editTaiKhoanId === taiKhoan.maTaiKhoan ? (
                    <input
                      type="text"
                      value={editTaiKhoan.tenDangNhap}
                      onChange={(e) => setEditTaiKhoan({ ...editTaiKhoan, tenDangNhap: e.target.value })}
                    />
                  ) : (
                    taiKhoan.tenDangNhap
                  )}
                </td>
                <td>
                  {editTaiKhoanId === taiKhoan.maTaiKhoan ? (
                    <input
                      type="text"
                      value={editTaiKhoan.loaiTaiKhoan}
                      onChange={(e) => setEditTaiKhoan({ ...editTaiKhoan, loaiTaiKhoan: e.target.value })}
                    />
                  ) : (
                    taiKhoan.loaiTaiKhoan
                  )}
                </td>
                <td>
                  {editTaiKhoanId === taiKhoan.maTaiKhoan ? (
                    <input
                      type="text"
                      value={editTaiKhoan.matKhau}
                      onChange={(e) => setEditTaiKhoan({ ...editTaiKhoan, matKhau: e.target.value })}
                    />
                  ) : (
                    taiKhoan.matKhau
                  )}
                </td>
                <td>
                  {editTaiKhoanId === taiKhoan.maTaiKhoan ? (
                    <input
                      type="text"
                      value={editTaiKhoan.caLam}
                      onChange={(e) => setEditTaiKhoan({ ...editTaiKhoan, caLam: e.target.value })}
                    />
                  ) : (
                    taiKhoan.caLam
                  )}
                </td>
                <td className='d-flex justify-content-center gap-2'>
                  {editTaiKhoanId === taiKhoan.maTaiKhoan ? (
                    <button onClick={updateTaiKhoan} className="btn btn-success">Lưu</button>
                  ) : (
                    <>
                      <button onClick={() => startEdit(taiKhoan)} className="btn btn-warning mr-2">Sửa</button>
                      <button onClick={() => { setTaiKhoanToDelete(taiKhoan.maTaiKhoan); setShowDeleteModal(true); }} className="btn btn-danger">Xóa</button>
                    </>
                  )}
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
                <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Hủy</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteTaiKhoan(taiKhoanToDelete)}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles for Modal */}
      <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          z-index: 1050;
        }
      `}</style>
    </div>
  );
};

export default TaiKhoanList;
