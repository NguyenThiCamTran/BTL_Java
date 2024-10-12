package com.example.demo1.Controller;

import com.example.demo1.Entities.Ban;
import com.example.demo1.Repos.BanRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ban")
public class BanController {

    private final BanRepo banRepo;

    public BanController(BanRepo banRepo) {
        this.banRepo = banRepo;
    }

    @GetMapping
    public ResponseEntity<Iterable<Ban>> getBan() {
        try {
            Iterable<Ban> bans = this.banRepo.findAll();
            return ResponseEntity.ok(bans);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    //Chức năng thêm bàn
    @PostMapping("/add")
    public ResponseEntity<Ban> addBan(@RequestBody Ban ban) {
        Ban savedBan = this.banRepo.save(ban);
        return ResponseEntity.ok(savedBan); // Trả về trạng thái 200 OK
    }
    //Chức năng sửa bàn
    @PutMapping("/update")
    public ResponseEntity<Ban> updateBan(@RequestBody Ban ban) {
        Optional<Ban> existingBanOptional = this.banRepo.findById(ban.getMaBan());
        if (existingBanOptional.isPresent()) {
            Ban existingBan = existingBanOptional.get();
            existingBan.setTenBan(ban.getTenBan());
            existingBan.setTrangThai(ban.isTrangThai());
            Ban updatedBan = this.banRepo.save(existingBan);
            return ResponseEntity.ok(updatedBan);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
    //chức năng xóa bàn
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBan(@PathVariable Integer id) {
        Optional<Ban> banOptional = this.banRepo.findById(id);
        if (banOptional.isPresent()) {
            this.banRepo.delete(banOptional.get());
            return ResponseEntity.ok("Đã xóa bàn có ID: " + id);
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy bàn với ID: " + id);
        }
    }
    // Chức năng lấy các bàn có hóa đơn
    @GetMapping("/with-hoa-don")
    public ResponseEntity<List<Ban>> getBansWithHoaDon() {
        try {
            List<Ban> bansWithHoaDon = banRepo.findBansWithHoaDon();
            return ResponseEntity.ok(bansWithHoaDon);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
