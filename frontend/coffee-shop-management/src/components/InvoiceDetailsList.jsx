import React from 'react';

const InvoiceDetailsList = ({ currentInvoice, closeModal }) => {
  // Check if currentInvoice is defined
  let totalPrice = 0;
  console.log("currentInvoice", currentInvoice)
  if (!currentInvoice) {
    return (
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-overlay" />
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết hóa đơn</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Không có chi tiết hóa đơn.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Đóng</button>
              </div>
            </div>
          </div>
      </div>
    );
  }
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
  <div className="modal-overlay" />
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Chi tiết hóa đơn</h5>
        <button type="button" className="close" onClick={closeModal}>
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <p><strong>Thu Ngân:</strong> {currentInvoice?.taiKhoan?.tenDangNhap || 'N/A'}</p>
        <p><strong>Ngày Lập:</strong> {currentInvoice?.ngaylap || 'N/A'}</p>
        <p><strong>Trạng Thái:</strong> {currentInvoice?.trangthai || 'N/A'}</p>
        <p><strong>Hình Thức Mua:</strong> {currentInvoice?.hinhthucmua || 'N/A'}</p>
        <h5>Chi Tiết Hóa Đơn:</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Sản Phẩm</th>
              <th>Số Lượng</th>
              <th>Đơn Giá</th>
              <th>Tổng Giá</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoice?.chiTietHoaDonList && currentInvoice.chiTietHoaDonList.length > 0 ? (
              currentInvoice.chiTietHoaDonList.map((item) => {
                totalPrice += (item?.sanPham?.donGia) * item.soLuong
                return (
                  <tr key={item.maChiTietHoaDon}>
                    <td>{item.sanPham?.tenSanPham || 'N/A'}</td>
                    <td>{item.soLuong || 'N/A'}</td>
                    <td>{((item.sanPham?.donGia || 0).toFixed(3) + ' VNĐ') || 'N/A'}</td>
                    <td>{((item.soLuong * (item.sanPham?.donGia || 0)).toFixed(3) + ' VNĐ') || 'N/A'}</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Không có thông tin chi tiết có sẵn.</td>
              </tr>
            )}
          </tbody>
        </table>
        <p><strong>Tổng Tiền:</strong> {(totalPrice || 0).toFixed(3) + 'VNĐ' || 'N/A'}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Đóng</button>
      </div>
    </div>
  </div>
</div>

  );
};

export default InvoiceDetailsList;
