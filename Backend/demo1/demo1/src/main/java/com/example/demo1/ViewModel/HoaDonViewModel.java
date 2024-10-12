package com.example.demo1.ViewModel;

import com.example.demo1.Entities.ChiTietHoaDon;

import java.sql.Date;
import java.util.List;

public class HoaDonViewModel {
    private Integer maban;
    private Date ngaylap;
    private Double tongtien;

    private String trangthai;
    private String hinhthucmua;
    private Integer mataikhoan;
    private List<ChiTietHoaDonViewModel> chiTietHoaDonList;

    public void tinhTongTien() {
        this.tongtien = 0.0;
        if (chiTietHoaDonList != null) {
            for (ChiTietHoaDonViewModel chiTiet : chiTietHoaDonList) {
                this.tongtien += chiTiet.getSoluong() * chiTiet.getDongia();
            }
        }
    }

    public Integer getMataikhoan() {
        return mataikhoan;
    }

    public void setMataikhoan(Integer mataikhoan) {
        this.mataikhoan = mataikhoan;
    }

    public Integer getMaban() {
        return maban;
    }

    public void setMaban(Integer maban) {
        this.maban = maban;
    }

    public Date getNgaylap() {
        return ngaylap;
    }

    public void setNgaylap(Date ngaylap) {
        this.ngaylap = ngaylap;
    }

    public Double getTongtien() {
        return tongtien;
    }

    public void setTongtien(Double tongtien) {
        this.tongtien = tongtien;
    }

    public String getTrangthai() {
        return trangthai;
    }

    public void setTrangthai(String trangthai) {
        this.trangthai = trangthai;
    }

    public String getHinhthucmua() {
        return hinhthucmua;
    }

    public void setHinhthucmua(String hinhthucmua) {
        this.hinhthucmua = hinhthucmua;
    }

    public List<ChiTietHoaDonViewModel> getChiTietHoaDonList() {
        return chiTietHoaDonList;
    }

    public void setChiTietHoaDonList(List<ChiTietHoaDonViewModel> chiTietHoaDonList) {
        this.chiTietHoaDonList = chiTietHoaDonList;
    }
}
