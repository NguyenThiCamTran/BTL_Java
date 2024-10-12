package com.example.demo1.Controller;
import com.example.demo1.Entities.Ban;
import com.example.demo1.Entities.ChiTietHoaDon;
import com.example.demo1.Repos.BanRepo;
import com.example.demo1.Repos.ChiTietHoaDonRepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChiTietHoaDonController {
    private ChiTietHoaDonRepo chiTietHoaDonRepo;
    public ChiTietHoaDonController(ChiTietHoaDonRepo chiTietHoaDonRepo) {
        this.chiTietHoaDonRepo = chiTietHoaDonRepo;
    }

    @GetMapping("/chitiethoadon")
    public Iterable<ChiTietHoaDon> getChiTietHoaDon() {
        return this.chiTietHoaDonRepo.findAll();
    }

}
