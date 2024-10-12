package com.example.demo1.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class ChiTietHoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maChiTietHoaDon;

    @ManyToOne
    @JoinColumn(name = "ma_hoa_don", referencedColumnName = "maHoaDon")
    @JsonBackReference
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "ma_san_pham", referencedColumnName = "maSanPham")
    private SanPham sanPham;

    private Integer soLuong;
    private Double donGia;

    // Tính tiền cho từng sản phẩm (số lượng * đơn giá)
    public Double tinhTien() {
        return soLuong * donGia;
    }

    // Getters và Setters
    public Integer getMaChiTietHoaDon() {
        return maChiTietHoaDon;
    }

    public void setMaChiTietHoaDon(Integer maChiTietHoaDon) {
        this.maChiTietHoaDon = maChiTietHoaDon;
    }

    public HoaDon getHoaDon() {
        return hoaDon;
    }

    public void setHoaDon(HoaDon hoaDon) {
        this.hoaDon = hoaDon;
    }

    public SanPham getSanPham() {
        return sanPham;
    }

    public void setSanPham(SanPham sanPham) {
        this.sanPham = sanPham;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Double getDonGia() {
        return donGia;
    }

    public void setDonGia(Double donGia) {
        this.donGia = donGia;
    }
}
