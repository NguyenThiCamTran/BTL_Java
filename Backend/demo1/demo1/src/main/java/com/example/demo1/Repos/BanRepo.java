package com.example.demo1.Repos;

import com.example.demo1.Entities.Ban;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
@Repository
public interface BanRepo extends CrudRepository<Ban, Integer> {
    @Query("SELECT b FROM Ban b JOIN HoaDon h ON b.maBan = h.ban.maBan WHERE h IS NOT NULL")
    List<Ban> findBansWithHoaDon();
}
