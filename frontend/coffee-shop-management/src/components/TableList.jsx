import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const TableList = () => {
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState('');
  const [editTableId, setEditTableId] = useState(null);
  const [editTableName, setEditTableName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axiosInstance.get('/ban');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const addTable = async () => {
    try {
      await axiosInstance.post('/ban/add', { tenBan: newTable, trangThai: false });
      fetchTables();
      setNewTable('');
    } catch (error) {
      console.error('Error adding table:', error);
    }
  };

  const deleteTable = async (id) => {
    try {
      await axiosInstance.delete(`/ban/delete/${id}`);
      fetchTables();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  const confirmDelete = (id) => {
    setTableToDelete(id);
    setShowModal(true);
  };

  const startEdit = (table) => {
    setEditTableId(table.maBan);
    setEditTableName(table.tenBan);
  };

  const updateTable = async () => {
    try {
      await axiosInstance.put(`/ban/update`, { tenBan: editTableName, maBan: editTableId });
      fetchTables();
      setEditTableId(null);
      setEditTableName('');
    } catch (error) {
      console.error('Error updating table:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredTables = tables
    .filter((table) => table.tenBan.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((table) => {
      if (filterStatus === 'all') return true;
      return filterStatus === 'available' ? !table.trangThai : table.trangThai;
    });

  return (
    <div>
      {/* <h4 className='text-success'>Danh sách bàn</h4> */}
      <div className="row mb-3">
        {/* Add New Table */}
        <div className="col-md-4 d-flex align-items-center">
          <input
            type="text"
            value={newTable}
            onChange={(e) => setNewTable(e.target.value)}
            placeholder="Thêm bàn mới"
            className="form-control me-2"
          />
          <button onClick={addTable} className="btn btn-primary">Thêm</button>
        </div>

        {/* Filter by Status */}
        <div className="col-md-4 d-flex align-items-center">
          <label className="me-2">Lọc bàn</label>
          <select value={filterStatus} onChange={handleFilterChange} className="form-select w-75">
            <option value="all">Tất cả</option>
            <option value="available">Trống</option>
            <option value="occupied">Đã có hóa đơn</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="col-md-4 d-flex align-items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm kiếm bàn..."
            className="form-control"
          />
        </div>
      </div>

      {/* Table for displaying tables */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên Bàn</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredTables.map((table) => (
            <tr key={table.maBan}>
              <td>
                {editTableId === table.maBan ? (
                  <input
                    type="text"
                    value={editTableName}
                    onChange={(e) => setEditTableName(e.target.value)}
                  />
                ) : (
                  table.tenBan
                )}
              </td>
              <td>{table.trangThai ? 'Đã có hóa đơn' : 'Trống'}</td>
              <td className="w-25">
                {editTableId === table.maBan ? (
                  <button onClick={updateTable} className="btn btn-success">Lưu</button>
                ) : (
                  <div className="d-flex justify-content-center gap-2">
                    <button onClick={() => startEdit(table)} className="btn btn-warning">Sửa</button>
                    <button onClick={() => confirmDelete(table.maBan)} className="btn btn-danger">Xóa</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Confirm Delete */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-overlay" />
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận xóa</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa bàn này không?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteTable(tableToDelete)}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableList;
