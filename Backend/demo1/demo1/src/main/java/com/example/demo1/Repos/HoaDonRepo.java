package com.example.demo1.Repos;

import com.example.demo1.Entities.HoaDon;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.Date;
import java.util.List;
@Repository
public interface HoaDonRepo extends CrudRepository<HoaDon, Integer> {
    Optional<HoaDon> findById(Integer maHoaDon);
    List<HoaDon> findByNgaylap(Date ngaylap);
    @Query("SELECT h FROM HoaDon h WHERE EXTRACT(MONTH FROM h.ngaylap) = :month AND EXTRACT(YEAR FROM h.ngaylap) = :year")
    List<HoaDon> findByThang(Integer year, Integer month);

    // Tìm hóa đơn theo năm
    @Query("SELECT h FROM HoaDon h WHERE EXTRACT(YEAR FROM h.ngaylap) = :year")
    List<HoaDon> findByNam(Integer year);
}
