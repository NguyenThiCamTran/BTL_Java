package com.example.demo1.ViewModel;

import com.example.demo1.Entities.TaiKhoan;

public class TaiKhoanResponse {
    private TaiKhoan taikhoan;
    private String message;

    public TaiKhoan getTaikhoan() {
        return taikhoan;
    }

    public void setTaikhoan(TaiKhoan taikhoan) {
        this.taikhoan = taikhoan;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
