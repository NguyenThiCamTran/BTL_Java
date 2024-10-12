import React, { useState } from 'react';
import axios from 'axios';


const RevenuePage = () => {
  const [ngay, setNgay] = useState('');
  const [thang, setThang] = useState('');
  const [nam, setNam] = useState('');
  const [doanhThuNgay, setDoanhThuNgay] = useState(null);
  const [doanhThuThang, setDoanhThuThang] = useState(null);
  const [doanhThuNam, setDoanhThuNam] = useState(null);

  const handleGetDoanhThuNgay = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/hoadon/doanhthu/ngay?ngay=${ngay}`);
      setDoanhThuNgay(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu theo ngày:', error);
    }
  };

  const handleGetDoanhThuThang = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/hoadon/doanhthu/thang?month=${thang}&year=${nam}`);
      setDoanhThuThang(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu theo tháng:', error);
    }
  };

  const handleGetDoanhThuNam = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/hoadon/doanhthu/nam?year=${nam}`);
      setDoanhThuNam(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu theo năm:', error);
    }
  };

  return (
    <div className="">
      <div className='border border-2 rounded-3 py-2 mb-3'>
        <h2 className="ms-3">Tính Doanh Thu</h2>
      </div>
      <div className='border border-2 rounded-3 py-2 mb-3'>

        {/* Doanh thu theo ngày */}
        <div className="m-3">
          <h4>Doanh thu theo ngày</h4>
          <div className="input-group mb-3">
            <input
              type="date"
              className="form-control"
              value={ngay}
              onChange={(e) => setNgay(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleGetDoanhThuNgay}>
              Tính doanh thu theo ngày
            </button>
          </div>
          {doanhThuNgay && (
            <p className="text-success">Doanh thu ngày {ngay}: {doanhThuNgay} VND</p>
          )}
        </div>

        {/* Doanh thu theo tháng */}
        <div className="m-3">
          <h4>Doanh thu theo tháng</h4>
          <div className="row g-3">
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Tháng"
                value={thang}
                onChange={(e) => setThang(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Năm"
                value={nam}
                onChange={(e) => setNam(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={handleGetDoanhThuThang}>
                Tính doanh thu theo tháng
              </button>
            </div>
          </div>
          {doanhThuThang && (
            <p className="text-success mt-2">Doanh thu tháng {thang}/{nam}: {doanhThuThang} VND</p>
          )}
        </div>

        {/* Doanh thu theo năm */}
        <div className="m-3">
          <h4>Doanh thu theo năm</h4>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Năm"
              value={nam}
              onChange={(e) => setNam(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleGetDoanhThuNam}>
              Tính doanh thu theo năm
            </button>
          </div>
          {doanhThuNam && (
            <p className="text-success">Doanh thu năm {nam}: {doanhThuNam} VND</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default RevenuePage;
