package com.example.demo1.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class TaiKhoan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maTaiKhoan;

    @Column(nullable = false, unique = true, length = 50)
    private String tenDangNhap;

    @Column(nullable = false, length = 100)
    private String matKhau;

    @Column(length = 20)
    private String loaiTaiKhoan;

    @Column(length = 50)
    private String caLam;
    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.tenDangNhap = taiKhoan.getTenDangNhap();
        this.loaiTaiKhoan = taiKhoan.getLoaiTaiKhoan();
        this.caLam = taiKhoan.getCaLam();
        this.matKhau = taiKhoan.getMatKhau();
    }

    // Getters and Setters
    public Integer getMaTaiKhoan() {
        return maTaiKhoan;
    }

    public void setMaTaiKhoan(Integer maTaiKhoan) {
        this.maTaiKhoan = maTaiKhoan;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getLoaiTaiKhoan() {
        return loaiTaiKhoan;
    }

    public void setLoaiTaiKhoan(String loaiTaiKhoan) {
        this.loaiTaiKhoan = loaiTaiKhoan;
    }

    public String getCaLam() {
        return caLam;
    }

    public void setCaLam(String caLam) {
        this.caLam = caLam;
    }
}
