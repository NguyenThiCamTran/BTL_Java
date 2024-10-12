package com.example.demo1.Controller;
import com.example.demo1.Entities.TaiKhoan;
import com.example.demo1.Repos.TaiKhoanRepo;
import com.example.demo1.ViewModel.TaiKhoanResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@RequestMapping("/taikhoan")
public class TaiKhoanController {
    private final TaiKhoanRepo taiKhoanRepo;

    public TaiKhoanController(TaiKhoanRepo taiKhoanRepo) {
        this.taiKhoanRepo = taiKhoanRepo;
    }

    @GetMapping
    public Iterable<TaiKhoan> getTaiKhoan() {
        return this.taiKhoanRepo.findAll();
    }

  //  @PostMapping("/AddTaiKhoan")
   // public ResponseEntity<TaiKhoan> addTaiKhoan(@RequestBody TaiKhoan taiKhoan) {
     //   TaiKhoan savedTaiKhoan = this.taiKhoanRepo.save(taiKhoan);
      //  return new ResponseEntity<>(savedTaiKhoan, HttpStatus.OK); // Trả về 200 OK
  //  }
  @PostMapping("/dang-ky")
  public ResponseEntity<String> register(@RequestBody TaiKhoan taiKhoan) {
      // Check if the username already exists
      Optional<TaiKhoan> existingTaiKhoan = taiKhoanRepo.findByTenDangNhap(taiKhoan.getTenDangNhap());
      if (existingTaiKhoan.isPresent()) {
          return new ResponseEntity<>("Tên đăng nhập đã tồn tại", HttpStatus.CONFLICT); // 409 Conflict
      }
      // Save the account
      taiKhoanRepo.save(taiKhoan);
      return new ResponseEntity<>("Đăng ký thành công", HttpStatus.OK); // 200 Created
  }

    // Đăng nhập
    @PostMapping("/dang-nhap")
    public ResponseEntity<TaiKhoanResponse> login(@RequestBody TaiKhoan taiKhoan, HttpSession session) {
        Optional<TaiKhoan> existingTaiKhoan = taiKhoanRepo.findByTenDangNhap(taiKhoan.getTenDangNhap());
        TaiKhoanResponse response= new TaiKhoanResponse();
        if (existingTaiKhoan.isPresent()) {
            // Kiểm tra mật khẩu
            TaiKhoan taikhoan = existingTaiKhoan.get();

            if (taiKhoan.getMatKhau().equals(existingTaiKhoan.get().getMatKhau())) {
                response.setTaikhoan(taikhoan);
                response.setMessage("Đăng nhập thành công");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.setMessage("Sai tên tài khoản hoặc mật khẩu");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        }
        response.setMessage("Tài khoản không tồn tại");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Đăng xuất
    @PostMapping("/dang-xuat")
    public ResponseEntity<String> logout() {
        // Logic đăng xuất đơn giản, có thể chỉ là xoá token nếu sử dụng JWT, hoặc hủy session nếu có session.
        return new ResponseEntity<>("Đã đăng xuất thành công", HttpStatus.OK);
    }

    @PutMapping("/updateTaiKhoan")
    public ResponseEntity<TaiKhoan> updateTaiKhoan(@RequestBody TaiKhoan taiKhoan) {
        Optional<TaiKhoan> existingTaiKhoanOptional = this.taiKhoanRepo.findById(taiKhoan.getMaTaiKhoan());

        if (existingTaiKhoanOptional.isPresent()) {
            TaiKhoan existingTaiKhoan = existingTaiKhoanOptional.get();
            existingTaiKhoan.setTenDangNhap(taiKhoan.getTenDangNhap());
            existingTaiKhoan.setLoaiTaiKhoan(taiKhoan.getLoaiTaiKhoan());
            existingTaiKhoan.setMatKhau(taiKhoan.getMatKhau());
            existingTaiKhoan.setCaLam(taiKhoan.getCaLam());
            this.taiKhoanRepo.save(existingTaiKhoan);
            return new ResponseEntity<>(existingTaiKhoan, HttpStatus.OK); // Trả về 200 OK
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Trả về 404 Not Found
        }
    }

    @DeleteMapping("/deleteTaiKhoan")
    public ResponseEntity<String> deleteTaiKhoan(@RequestParam Integer maTaiKhoan) {
        Optional<TaiKhoan> taiKhoanOptional = this.taiKhoanRepo.findById(maTaiKhoan);

        if (taiKhoanOptional.isPresent()) {
            this.taiKhoanRepo.delete(taiKhoanOptional.get());
            return new ResponseEntity<>("Đã xóa thành công tài khoản có id là: " + maTaiKhoan, HttpStatus.OK); // Trả về 200 OK
        } else {
            return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.NOT_FOUND); // Trả về 404 Not Found
        }
    }

    // Chức năng tìm kiếm tài khoản theo tenDangNhap
    @GetMapping("/search")
    public ResponseEntity<TaiKhoan> searchTaiKhoan(@RequestParam String tenDangNhap) {
        Optional<TaiKhoan> taiKhoanOptional = this.taiKhoanRepo.findByTenDangNhap(tenDangNhap);

        if (taiKhoanOptional.isPresent()) {
            return new ResponseEntity<>(taiKhoanOptional.get(), HttpStatus.OK); // Trả về 200 OK với tài khoản tìm thấy
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Trả về 404 Not Found nếu không tìm thấy
        }
    }


}


