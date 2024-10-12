package com.example.demo1.Repos;

import com.example.demo1.Entities.SanPham;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepo extends CrudRepository<SanPham, Integer> {

    // Tìm kiếm theo tên và/hoặc trong khoảng giá
    @Query("SELECT s FROM SanPham s WHERE "
            + "( :tenSanPham IS NULL OR s.tenSanPham LIKE %:tenSanPham% ) "
            + "AND ( :minPrice IS NULL OR s.donGia >= :minPrice ) "
            + "AND ( :maxPrice IS NULL OR s.donGia <= :maxPrice )")
    List<SanPham> searchByTenSanPhamAndDonGia(String tenSanPham, Float minPrice, Float maxPrice);
}
