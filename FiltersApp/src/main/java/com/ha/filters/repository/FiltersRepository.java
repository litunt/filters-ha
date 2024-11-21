package com.ha.filters.repository;

import com.ha.filters.entity.FilterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FiltersRepository extends JpaRepository<FilterEntity, Long> {

}
