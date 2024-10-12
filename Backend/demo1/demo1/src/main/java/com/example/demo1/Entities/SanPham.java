package com.example.demo1.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng giá trị của MaSanPham
    private Integer maSanPham;

    @Column(nullable = false, length = 255)
    private String tenSanPham;

    @Column(nullable = false)
    private Float donGia;

    @Column(columnDefinition = "TEXT")
    private String moTa;

    @Column(length = 255)
    private String hinhAnh;

    public void setSanPham(SanPham sanPham) {
        this.tenSanPham = sanPham.getTenSanPham();
        this.donGia = sanPham.getDonGia();
        this.hinhAnh = sanPham.getHinhAnh();
        this.moTa= sanPham.getMoTa();
    }
    // Getters and Setters
    public Integer getMaSanPham() {
        return maSanPham;
    }

    public void setMaSanPham(Integer maSanPham) {
        this.maSanPham = maSanPham;
    }

    public String getTenSanPham() {
        return tenSanPham;
    }

    public void setTenSanPham(String tenSanPham) {
        this.tenSanPham = tenSanPham;
    }

    public Float getDonGia() {
        return donGia;
    }

    public void setDonGia(Float donGia) {
        this.donGia = donGia;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getHinhAnh() {
        return hinhAnh;
    }

    public void setHinhAnh(String hinhAnh) {
        this.hinhAnh = hinhAnh;
    }
}
