package com.example.demo1.Entities;

import jakarta.persistence.*;

@Entity
public class Ban {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maBan;
    private String tenBan;
    private boolean trangThai;

    // Getters và Setters
    public Integer getMaBan() {
        return maBan;
    }

    public void setMaBan(Integer maBan) {
        this.maBan = maBan;
    }

    public String getTenBan() {
        return tenBan;
    }

    public void setTenBan(String tenBan) {
        this.tenBan = tenBan;
    }

    public boolean isTrangThai() {
        return trangThai;
    }

    public void setTrangThai(boolean trangThai) {
        this.trangThai = trangThai;
    }
}
