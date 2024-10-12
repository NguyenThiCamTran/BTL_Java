package com.example.demo1.Repos;

import com.example.demo1.Entities.TaiKhoan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TaiKhoanRepo extends CrudRepository<TaiKhoan, Integer>{
    Optional<TaiKhoan> findByTenDangNhap(String tenDangNhap);
}

