package com.example.demo1.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mahoadon;

    @Temporal(TemporalType.DATE)
    private Date ngaylap;

    private Double tongtien;

    private String trangthai;

    @ManyToOne
    @JoinColumn(name = "maban", referencedColumnName = "maBan", nullable = true)
    private Ban ban;

    @ManyToOne
    @JoinColumn(name = "mataikhoan", referencedColumnName = "maTaiKhoan", nullable = true)
    private TaiKhoan taiKhoan;

    private String hinhthucmua;
    @JsonManagedReference
    @OneToMany(mappedBy = "hoaDon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietHoaDon> chiTietHoaDonList = new ArrayList<>();;

    // Phương thức tính tổng tiền
    public void tinhTongTien() {
        this.tongtien = 0.0;
        if (chiTietHoaDonList != null) {
            for (ChiTietHoaDon chiTiet : chiTietHoaDonList) {
                this.tongtien += chiTiet.getSoLuong() * chiTiet.getDonGia();
            }
        }
    }

    // Phương thức gộp hóa đơn
    public void gopHoaDon(HoaDon hoaDonKhac) {
        if (hoaDonKhac.getChiTietHoaDonList() != null) {
            for (ChiTietHoaDon chiTiet : hoaDonKhac.getChiTietHoaDonList()) {
                this.chiTietHoaDonList.add(chiTiet);
                chiTiet.setHoaDon(this); // Cập nhật liên kết giữa ChiTietHoaDon và HoaDon
            }
        }
        this.tinhTongTien(); // Cập nhật tổng tiền sau khi gộp
    }

    public Integer getMahoadon() {
        return mahoadon;
    }

    public void setMahoadon(Integer mahoadon) {
        this.mahoadon = mahoadon;
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

    public Ban getBan() {
        return ban;
    }

    public void setBan(Ban ban) {
        this.ban = ban;
    }

    public TaiKhoan getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }

    public String getHinhthucmua() {
        return hinhthucmua;
    }

    public void setHinhthucmua(String hinhthucmua) {
        this.hinhthucmua = hinhthucmua;
    }

    public List<ChiTietHoaDon> getChiTietHoaDonList() {
        return chiTietHoaDonList;
    }

    public void setChiTietHoaDonList(List<ChiTietHoaDon> chiTietHoaDonList) {
        this.chiTietHoaDonList = chiTietHoaDonList;
    }
}
