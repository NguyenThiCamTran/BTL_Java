import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductSelector = ({ onProductSelect }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/sanpham');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductChange = (event) => {
        const productId = event.target.value;
        const product = products.find(p => p.maSanPham === productId);
        setSelectedProduct(product);
        if (onProductSelect) {
            onProductSelect(product);
        }
    };

    return (
        <div>
            <label htmlFor="product">Chọn sản phẩm:</label>
            <select id="product" onChange={handleProductChange}>
                <option value="">--Chọn sản phẩm--</option>
                {products.map(product => (
                    <option key={product.maSanPham} value={product.maSanPham}>
                        {product.tenSanPham} - {product.donGia} VNĐ
                    </option>
                ))}
            </select>
            {selectedProduct && (
                <div>
                    <h4>Thông tin sản phẩm đã chọn:</h4>
                    <p>Tên sản phẩm: {selectedProduct.tenSanPham}</p>
                    <p>Đơn giá: {selectedProduct.donGia} VNĐ</p>
                </div>
            )}
        </div>
    );
};

export default ProductSelector;
