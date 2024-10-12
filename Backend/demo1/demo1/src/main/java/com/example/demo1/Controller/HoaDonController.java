package com.example.demo1.Controller;

import com.example.demo1.Entities.*;
import com.example.demo1.Repos.HoaDonRepo;
import com.example.demo1.Repos.BanRepo;
import com.example.demo1.Repos.SanPhamRepo;
import com.example.demo1.Repos.TaiKhoanRepo;
import com.example.demo1.ViewModel.HoaDonViewModel;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/hoadon")
public class HoaDonController {

    private final HoaDonRepo hoaDonRepo;
    private final BanRepo banRepo;
    private final TaiKhoanRepo taikhoanRepo;
    private final SanPhamRepo sanPhamRepo;

    public HoaDonController(HoaDonRepo hoaDonRepo, BanRepo banRepo, TaiKhoanRepo taikhoanRepo, SanPhamRepo sanPhamRepo) {
        this.hoaDonRepo = hoaDonRepo;
        this.banRepo = banRepo;
        this.taikhoanRepo = taikhoanRepo;
        this.sanPhamRepo = sanPhamRepo;
    }

    @GetMapping
    public ResponseEntity<Iterable<HoaDon>> getAllHoaDons() {
        return ResponseEntity.ok(hoaDonRepo.findAll());
    }

    @PostMapping("/AddHoaDon")
    public ResponseEntity<?> createHoaDon(@RequestBody HoaDon hoaDon) {
        // Validate Ban
        Optional<Ban> optionalBan = banRepo.findById(hoaDon.getBan().getMaBan());
        if (!optionalBan.isPresent()) {
            return ResponseEntity.badRequest().body("Bàn với ID " + hoaDon.getBan().getMaBan() + " không tồn tại.");
        }

        Ban ban = optionalBan.get();
        ban.setTrangThai(true); // Cập nhật bàn đang được sử dụng
        banRepo.save(ban);

        // Validate TaiKhoan
        Optional<TaiKhoan> optionalTaiKhoan = taikhoanRepo.findByTenDangNhap(hoaDon.getTaiKhoan().getTenDangNhap());
        if (!optionalTaiKhoan.isPresent()) {
            return ResponseEntity.badRequest().body("Tài khoản với ID " + hoaDon.getTaiKhoan().getMaTaiKhoan() + " không tồn tại.");
        }
        TaiKhoan taikhoan = optionalTaiKhoan.get();

        // Gán ngày lập hóa đơn là ngày hiện tại
        hoaDon.setNgaylap(Date.valueOf(LocalDate.now()));
        hoaDon.setTrangthai("Chưa thanh toán");
        hoaDon.setBan(ban);
        hoaDon.setTaiKhoan(taikhoan);

        // Validate ChiTietHoaDonList
        if (hoaDon.getChiTietHoaDonList() == null || hoaDon.getChiTietHoaDonList().isEmpty()) {
            return ResponseEntity.badRequest().body("Danh sách chi tiết hóa đơn không được để trống.");
        }

        for (ChiTietHoaDon chiTiet : hoaDon.getChiTietHoaDonList()) {
            Optional<SanPham> optionalSanPham = sanPhamRepo.findById(chiTiet.getSanPham().getMaSanPham());
            if (!optionalSanPham.isPresent()) {
                return ResponseEntity.badRequest().body("Sản phẩm với ID " + chiTiet.getSanPham().getMaSanPham() + " không tồn tại.");
            }
            SanPham sanpham = optionalSanPham.get();
            chiTiet.setSanPham(sanpham);
            chiTiet.setHoaDon(hoaDon);
        }

        // Tính tổng tiền từ danh sách sản phẩm
        hoaDon.tinhTongTien();

        try {
            // Lưu hóa đơn vào cơ sở dữ liệu
            HoaDon savedHoaDon = hoaDonRepo.save(hoaDon);
            return ResponseEntity.ok(savedHoaDon); // Return the saved invoice
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi lưu hóa đơn: " + e.getMessage());
        }
    }

    // Chức năng thanh toán hóa đơn
    @PostMapping("/ThanhToan/{mahoadon}")
    public ResponseEntity<HoaDon> thanhToanHoaDon(@PathVariable Integer mahoadon) {
        // Tìm hóa đơn theo ID
        Optional<HoaDon> optionalHoaDon = hoaDonRepo.findById(mahoadon);
        if (!optionalHoaDon.isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }

        HoaDon hoaDon = optionalHoaDon.get();

        // Kiểm tra trạng thái của hóa đơn (nếu đã thanh toán thì không thể thanh toán lại)
        if ("Đã thanh toán".equalsIgnoreCase(hoaDon.getTrangthai())) {
            return ResponseEntity.badRequest().body(null);
        }

        // Cập nhật trạng thái hóa đơn thành "PAID"
        hoaDon.setTrangthai("Đã thanh toán");

        // Cập nhật trạng thái của bàn thành false (bàn trống)
        Ban ban = hoaDon.getBan();
        if (ban != null) {
            ban.setTrangThai(false);  // Bàn trống sau khi thanh toán
            banRepo.save(ban);        // Lưu lại thông tin bàn
        }

        // Lưu lại hóa đơn sau khi thanh toán
        HoaDon savedHoaDon = hoaDonRepo.save(hoaDon);

        // Trả về toàn bộ thông tin hóa đơn đã được thanh toán
        return ResponseEntity.ok(savedHoaDon);
    }

    // Chức năng chuyển hóa đơn
    @PostMapping("/ChuyenHoaDon/{mahoadon}")
    public ResponseEntity<String> chuyenBan(@PathVariable Integer mahoadon, @RequestParam Integer maBanMoi) {
        // Tìm hóa đơn theo ID
        Optional<HoaDon> optionalHoaDon = hoaDonRepo.findById(mahoadon);
        if (!optionalHoaDon.isPresent()) {
            return ResponseEntity.badRequest().body("Hóa đơn với mã " + mahoadon + " không tồn tại.");
        }

        HoaDon hoaDon = optionalHoaDon.get();

        // Tìm bàn cũ (bàn hiện tại của hóa đơn)
        Ban banCu = hoaDon.getBan();
        if (banCu != null) {
            // Cập nhật trạng thái bàn cũ thành trống
            banCu.setTrangThai(false);
            banRepo.save(banCu);
        }

        // Tìm bàn mới
        Optional<Ban> optionalBanMoi = banRepo.findById(maBanMoi);
        if (!optionalBanMoi.isPresent()) {
            return ResponseEntity.badRequest().body("Bàn với mã " + maBanMoi + " không tồn tại.");
        }

        Ban banMoi = optionalBanMoi.get();

        // Kiểm tra xem bàn mới có đang được sử dụng không
        if (banMoi.isTrangThai()) {
            return ResponseEntity.badRequest().body("Bàn mới đã có người sử dụng.");
        }

        // Cập nhật trạng thái bàn mới thành đang sử dụng
        banMoi.setTrangThai(true);
        banRepo.save(banMoi);

        // Cập nhật thông tin hóa đơn với bàn mới
        hoaDon.setBan(banMoi);
        hoaDonRepo.save(hoaDon);

        return ResponseEntity.ok("Chuyển bàn thành công từ bàn " + banCu.getMaBan() + " sang bàn " + maBanMoi);
    }


    //Chức năng gộp hóa đơn
    @PostMapping("/GopHoaDon")
    public ResponseEntity<String> gopHoaDon(@RequestBody List<Integer> maHoaDons) {
        // Kiểm tra danh sách mã hóa đơn
        if (maHoaDons == null || maHoaDons.isEmpty()) {
            return ResponseEntity.badRequest().body("Danh sách mã hóa đơn không được để trống.");
        }

        List<HoaDon> hoaDons = new ArrayList<>();
        for (Integer maHoaDon : maHoaDons) {
            Optional<HoaDon> optionalHoaDon = hoaDonRepo.findById(maHoaDon);
            if (!optionalHoaDon.isPresent()) {
                return ResponseEntity.badRequest().body("Hóa đơn với mã " + maHoaDon + " không tồn tại.");
            }

            hoaDons.add(optionalHoaDon.get());
        }

        // Gộp hóa đơn
        HoaDon hoaDonGop = hoaDons.get(0); // Chọn hóa đơn đầu tiên để gộp
        for (int i = 1; i < hoaDons.size(); i++) {
            hoaDonGop.gopHoaDon(hoaDons.get(i)); // Gộp từng hóa đơn còn lại
        }

        // Lưu hóa đơn mới
        hoaDonRepo.save(hoaDonGop);

        // Xóa các hóa đơn cũ
        for (HoaDon hoaDon : hoaDons) {
            if (!hoaDon.equals(hoaDonGop)) {
                Ban ban = banRepo.findById(hoaDon.getBan().getMaBan()).get();
                ban.setTrangThai(false);
                hoaDonRepo.delete(hoaDon);
            }
        }

        return ResponseEntity.ok("Gộp hóa đơn thành công. Hóa đơn mới đã được tạo với mã " + hoaDonGop.getMahoadon());
    }


    // Tính doanh thu theo ngày
    @GetMapping("/doanhthu/ngay")
    public ResponseEntity<Double> getDoanhThuTheoNgay(@RequestParam String ngay) {
        Date date = Date.valueOf(ngay); // Chuyển đổi từ String sang Date
        List<HoaDon> hoaDons = hoaDonRepo.findByNgaylap(date);
        Double doanhThu = hoaDons.stream().mapToDouble(HoaDon::getTongtien).sum();
        return new ResponseEntity<>(doanhThu, HttpStatus.OK);
    }

    // Tính doanh thu theo tháng
    @GetMapping("/doanhthu/thang")
    public ResponseEntity<Double> getDoanhThuTheoThang(@RequestParam Integer month, @RequestParam Integer year) {
        List<HoaDon> hoaDons = hoaDonRepo.findByThang(year, month);
        Double doanhThu = hoaDons.stream().mapToDouble(HoaDon::getTongtien).sum();
        return new ResponseEntity<>(doanhThu, HttpStatus.OK);
    }

    // Tính doanh thu theo năm
    @GetMapping("/doanhthu/nam")
    public ResponseEntity<Double> getDoanhThuTheoNam(@RequestParam Integer year) {
        List<HoaDon> hoaDons = hoaDonRepo.findByNam(year);
        Double doanhThu = hoaDons.stream().mapToDouble(HoaDon::getTongtien).sum();
        return new ResponseEntity<>(doanhThu, HttpStatus.OK);
    }

}
