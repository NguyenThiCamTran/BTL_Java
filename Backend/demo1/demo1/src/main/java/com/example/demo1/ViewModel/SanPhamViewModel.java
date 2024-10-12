package com.example.demo1.ViewModel;

import jakarta.persistence.Column;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public class SanPhamViewModel {
    private Integer maSanPham;


    private String tenSanPham;


    private Float donGia;


    private String moTa;

    private MultipartFile hinhAnh;

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

    public MultipartFile getHinhAnh() {
        return hinhAnh;
    }

    public void setHinhAnh(MultipartFile hinhAnh) {
        this.hinhAnh = hinhAnh;
    }
}
