import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import InvoiceDetailsList from './InvoiceDetailsList';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [tables, setTables] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false); // For viewing details
    const [user, setUser] = useState(null)
    const [currentInvoice, setCurrentInvoice] = useState({
        ngaylap: new Date().toISOString().split('T')[0],
        tongtien: 0,
        trangthai: 'Chưa thanh toán',
        hinhthucmua: 'Tại quán',
        taiKhoan: {
            tenDangNhap: ""
        },
        chiTietHoaDonList: [],
        ban: {}
    });

    useEffect(()=>{
        const auth = localStorage.getItem("auth")
        if(auth){
            setUser(JSON.parse(auth))
        }
    }, [])
    

    // Loading states
    const [loadingInvoices, setLoadingInvoices] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingTables, setLoadingTables] = useState(false);

    useEffect(() => {
        fetchInvoices();
        fetchTables();
        fetchProducts();
    }, []);

    const fetchInvoices = async () => {
        setLoadingInvoices(true);
        try {
            const response = await axiosInstance.get('/hoadon');
            setInvoices(response.data || []); // Ensure it defaults to an empty array
            console.log("Fetched Invoices:", response.data);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            alert('Có lỗi xảy ra khi lấy danh sách hóa đơn.');
        } finally {
            setLoadingInvoices(false);
        }
    };

    const fetchTables = async () => {
        setLoadingTables(true);
        try {
            const response = await axiosInstance.get('/ban');
            setTables(response.data || []); // Ensure it defaults to an empty array
            console.log("Fetched Tables:", response.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
            alert('Có lỗi xảy ra khi lấy danh sách bàn.');
        } finally {
            setLoadingTables(false);
        }
    };

    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const response = await axiosInstance.get('/sanpham');
            setProducts(response.data || []); // Ensure it defaults to an empty array
            console.log("Fetched Products:", response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Có lỗi xảy ra khi lấy danh sách sản phẩm.');
        } finally {
            setLoadingProducts(false);
        }
    };

    const addInvoice = async () => {
        try {
            
            const invoiceToAdd = {
                ...currentInvoice,
                mahoadon: null,
                taiKhoan: {
                    tenDangNhap: user?.tenDangNhap
                },
                chiTietHoaDonList: selectedProducts.map(product => ({
                    sanPham: { maSanPham: product.maSanPham },
                    soLuong: product.soLuong,  // Use the selected quantity
                    donGia: product.donGia      // Use the product price
                })),
            };
            // Calculate total price
            invoiceToAdd.tongtien = invoiceToAdd.chiTietHoaDonList.reduce((total, item) => {
                return total + (item.soLuong * item.donGia);
            }, 0);
    
            console.log("Invoice to Add:", invoiceToAdd);
            const response = await axiosInstance.post('/hoadon/AddHoaDon', invoiceToAdd);
            console.log("Response from server:", response.data);
    
            fetchInvoices();
            setShowAddModal(false);
            resetCurrentInvoice();
        } catch (error) {
            console.error('Error adding invoice:', error);
            alert('Có lỗi xảy ra khi thêm hóa đơn: ' + (error.response ? error.response.data : error.message));
        }
    };
    

    const resetCurrentInvoice = () => {
        setCurrentInvoice({
            ngaylap: new Date().toISOString().split('T')[0],
            tongtien: 0,
            trangthai: 'Chưa thanh toán',
            hinhthucmua: 'Tại quán',
            taiKhoan: {
                tenDangNhap: user?.tenDangNhap
            },
            chiTietHoaDonList: [],
            ban: {}
        });
        setSelectedProducts([]);
    };

    const viewInvoiceDetails = (invoice) => {
        setCurrentInvoice(invoice);
        setShowDetailsModal(true); // Open details modal
    };

    const handlePayment = async (mahoadon) => {
        try {
            const response = await axiosInstance.post(`/hoadon/ThanhToan/${mahoadon}`);
            console.log('Invoice payment successful:', response.data);
            fetchInvoices();  // Refresh the list of invoices
            alert('Thanh toán hóa đơn thành công.');
        } catch (error) {
            console.error('Error during payment:', error);
            alert('Có lỗi xảy ra khi thanh toán hóa đơn: ' + (error.response ? error.response.data : error.message));
        }
    };

    const handleProductQuantityChange = (product, quantity) => {
        // Ensure the quantity is a number and greater than or equal to 0
        const qty = Math.max(0, parseInt(quantity, 10));

        setSelectedProducts(prevSelectedProducts => {
            // If the quantity is 0, remove the product from the selectedProducts
            if (qty === 0) {
                return prevSelectedProducts.filter(p => p.maSanPham !== product.maSanPham);
            }

            // Check if the product is already selected
            const productExists = prevSelectedProducts.some(p => p.maSanPham === product.maSanPham);

            // If the product exists, update its quantity
            if (productExists) {
                return prevSelectedProducts.map(p =>
                    p.maSanPham === product.maSanPham ? { ...p, soLuong: qty } : p
                );
            }

            // If it's a new product, add it to the selectedProducts with the quantity
            return [...prevSelectedProducts, { ...product, soLuong: qty }];
        });
    };


    const filteredInvoices = invoices.filter(invoice =>
        (invoice.maHoaDon && invoice.maHoaDon.toString().includes(searchTerm)) ||
        (invoice.ngaylap && invoice.ngaylap.includes(searchTerm))
    );
    return (
        <div className='m-3'>
            <div className="d-flex justify-content-between mb-3">
                <button onClick={() => setShowAddModal(true)} className="btn btn-primary">Thêm hóa đơn</button>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm hóa đơn..."
                    className="form-control w-25"
                />
            </div>

            {/* Add Invoice Modal */}
            {showAddModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-overlay" />
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thêm hóa đơn</h5>
                                <button type="button" className="close" onClick={() => setShowAddModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5>Chọn sản phẩm</h5>
                                {loadingProducts ? (
                                    <div className="text-center">
                                        <div className="spinner-border" role="status">
                                            {/* <span className="sr-only">Loading...</span> */}
                                        </div>
                                        {/* <p>Loading products...</p> */}
                                    </div>
                                ) : (
                                    <ul className="list-group">
                                        {products.map(product => {
                                            const selectedProduct = selectedProducts.find(p => p.maSanPham === product.maSanPham);
                                            const quantity = selectedProduct ? selectedProduct.soLuong : 0;

                                            return (
                                                <li key={product.maSanPham} className="list-group-item">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            {product.tenSanPham} - {product.donGia} VND
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={quantity}
                                                                className="form-control form-control-sm mx-2"
                                                                style={{ width: '60px' }}
                                                                onChange={(e) => handleProductQuantityChange(product, e.target.value)}
                                                            />
                                                            <span>Số lượng</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}


                                <h5 className="mt-3">Hình thức mua</h5>
                                <select
                                    className="form-control"
                                    value={currentInvoice.hinhthucmua}
                                    onChange={(e) => {

                                        setCurrentInvoice({ ...currentInvoice, hinhthucmua: e.target.value })
                                    }}
                                >
                                    <option value="Tại quán">Tại quán</option>
                                    <option value="Mang về">Mang về</option>
                                </select>

                                <h5 className="mt-3">Chọn bàn</h5>
                                {loadingTables ? (
                                    <div className="text-center">
                                        <div className="spinner-border" role="status">
                                            {/* <span className="sr-only">Loading...</span> */}
                                        </div>
                                        {/* <p>Loading tables...</p> */}
                                    </div>
                                ) : (
                                    <select
                                        className="form-control"
                                        value={currentInvoice.ban.maBan || ''} // Default to an empty string if no table is selected
                                        onChange={(e) => {
                                            const selectedTable = tables.find(table => table.maBan === parseInt(e.target.value));
                                            setCurrentInvoice({ ...currentInvoice, ban: selectedTable });
                                        }}
                                    >
                                        {tables
                                            .filter(table => table.trangThai === false) // Only show available tables
                                            .map(table => (
                                                <option key={table.maBan} value={table.maBan}>
                                                    Bàn {table.tenBan}
                                                </option>
                                            ))}
                                    </select>
                                )}

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={addInvoice}>Lưu hóa đơn</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Render filtered invoices */}
            {loadingInvoices ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        {/* <span className="sr-only">Loading...</span> */}
                    </div>
                    {/* <p>Loading invoices...</p> */}
                </div>
            ) : (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Mã hóa đơn</th>
                            <th>Ngày lập</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Hình thức mua</th>
                            <th>Bàn</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map(invoice => (
                            <tr key={invoice.mahoadon}>
                                <td>{invoice.mahoadon}</td>
                                <td>{invoice.ngaylap}</td>
                                <td>{invoice.tongtien?.toFixed(3)} VND</td>
                                <td>{invoice.trangthai}</td>
                                <td>{invoice.hinhthucmua}</td>
                                <td>{invoice.ban?.tenBan || 'N/A'}</td>
                                <td className="d-flex justify-content-center gap-2" >
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => viewInvoiceDetails(invoice)}
                                    >
                                        Chi tiết
                                    </button>
                                    <button
                                        className="btn btn-success btn-sm ml-2"
                                        onClick={() => handlePayment(invoice.mahoadon)}
                                        disabled={invoice.trangthai === "Hoàn tất"}
                                    >
                                        Thanh toán
                                    </button>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Invoice details modal */}
            {showDetailsModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chi Tiết Hóa Đơn</h5>
                                <button type="button" className="close" onClick={() => setShowDetailsModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <InvoiceDetailsList currentInvoice={currentInvoice} closeModal={() => setShowDetailsModal(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default InvoiceList;
