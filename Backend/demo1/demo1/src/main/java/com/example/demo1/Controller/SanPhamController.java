package com.example.demo1.Controller;

import com.example.demo1.Entities.SanPham;
import com.example.demo1.Repos.SanPhamRepo;
import com.example.demo1.ViewModel.SanPhamViewModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sanpham")
public class SanPhamController {
    private final SanPhamRepo sanPhamRepo;
    private final String UPLOAD_DIR = "src/main/resources/static/";
    public SanPhamController(SanPhamRepo sanPhamRepo) {
        this.sanPhamRepo = sanPhamRepo;
    }

    @GetMapping
    public Iterable<SanPham> getSanPham() {
        return this.sanPhamRepo.findAll();
    }

    @PostMapping("/AddSanPham")
    public ResponseEntity<String> addSanPham(@ModelAttribute SanPhamViewModel sanPhamViewModel) {
        SanPham sanPham = new SanPham();
        sanPham.setTenSanPham(sanPhamViewModel.getTenSanPham());
        sanPham.setDonGia(sanPhamViewModel.getDonGia());
        sanPham.setMoTa(sanPhamViewModel.getMoTa());

        // Lưu hình ảnh
        MultipartFile hinhAnhFile = sanPhamViewModel.getHinhAnh();
        if (hinhAnhFile != null && !hinhAnhFile.isEmpty()) {
            String hinhAnhName = System.currentTimeMillis() + "_" + hinhAnhFile.getOriginalFilename();
            File destinationFile = new File(UPLOAD_DIR, hinhAnhName);
            try {
                FileCopyUtils.copy(hinhAnhFile.getBytes(), destinationFile);
                sanPham.setHinhAnh(hinhAnhName); // Lưu tên file hình ảnh vào đối tượng sanPham
            } catch (IOException e) {
                return new ResponseEntity<>("Error uploading file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        sanPhamRepo.save(sanPham);

        return new ResponseEntity<>("Product added successfully!", HttpStatus.CREATED);
    }


    @PutMapping("/updateSanPham")
    public ResponseEntity<SanPham> updateSanPham(@ModelAttribute SanPhamViewModel sanPhamViewModel) {
        Optional<SanPham> existingSanPhamOptional = this.sanPhamRepo.findById(sanPhamViewModel.getMaSanPham());

        if (existingSanPhamOptional.isPresent()) {
            SanPham existingSanPham = existingSanPhamOptional.get();

            // Cập nhật các trường không liên quan đến hình ảnh
            existingSanPham.setTenSanPham(sanPhamViewModel.getTenSanPham());
            existingSanPham.setDonGia(sanPhamViewModel.getDonGia());
            existingSanPham.setMoTa(sanPhamViewModel.getMoTa());

            // Nếu có hình ảnh mới, cập nhật trường hinhAnh
            if (sanPhamViewModel.getHinhAnh() != null && !sanPhamViewModel.getHinhAnh().isEmpty()) {
                String hinhAnhPath = saveImage(sanPhamViewModel.getHinhAnh());
                existingSanPham.setHinhAnh(hinhAnhPath);
            }

            this.sanPhamRepo.save(existingSanPham);
            return new ResponseEntity<>(existingSanPham, HttpStatus.OK); // Trả về 200 OK
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Trả về 404 Not Found
        }
    }

    // Phương thức để lưu hình ảnh vào thư mục và trả về đường dẫn
    private String saveImage(MultipartFile file) {
        try {
            // Thư mục lưu trữ hình ảnh
            String projectDirectory = System.getProperty("user.dir");

            // Thư mục lưu trữ hình ảnh
            String uploadDir = projectDirectory + "/src/main/resources/static/";
            File uploadDirectory = new File(uploadDir);

            // Tạo thư mục nếu không tồn tại
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destinationFile = new File(uploadDir + fileName);
            file.transferTo(destinationFile); // Dòng có thể gặp lỗi
            return fileName; // Trả về tên file để lưu vào cơ sở dữ liệu
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save image");
        }
    }


    @DeleteMapping("/deleteSanPham")
    public ResponseEntity<String> deleteSanPham(@RequestParam Integer maSanPham) {
        Optional<SanPham> sanPhamOptional = this.sanPhamRepo.findById(maSanPham);

        if (sanPhamOptional.isPresent()) {
            this.sanPhamRepo.delete(sanPhamOptional.get());
            return new ResponseEntity<>("Đã xóa thành công sản phẩm có id là: " + maSanPham, HttpStatus.OK); // Trả về 200 OK
        } else {
            return new ResponseEntity<>("Sản phẩm không tồn tại", HttpStatus.NOT_FOUND); // Trả về 404 Not Found
        }
    }
    // Tìm kiếm sản phẩm theo tên và/hoặc giá
    @GetMapping("/search")
    public ResponseEntity<List<SanPham>> searchSanPham(
            @RequestParam(required = false) String tenSanPham,
            @RequestParam(required = false) Float minPrice,
            @RequestParam(required = false) Float maxPrice) {

        // Gọi phương thức tìm kiếm với các tham số có thể là null
        List<SanPham> sanPhams = sanPhamRepo.searchByTenSanPhamAndDonGia(tenSanPham, minPrice, maxPrice);

        if (sanPhams.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Không tìm thấy sản phẩm
        }

        return new ResponseEntity<>(sanPhams, HttpStatus.OK); // Trả về danh sách sản phẩm tìm thấy
    }
}
