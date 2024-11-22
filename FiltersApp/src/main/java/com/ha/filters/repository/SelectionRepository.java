package com.ha.filters.repository;

import com.ha.filters.entity.SelectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelectionRepository extends JpaRepository<SelectionEntity, Long> {

}
