package com.ha.filters.service;

import com.ha.filters.entity.FilterEntity;
import com.ha.filters.mapper.FiltersMapper;
import com.ha.filters.model.Filter;
import com.ha.filters.repository.FiltersRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FiltersService {

  private final FiltersMapper filtersMapper;
  private final FiltersRepository filtersRepository;

  public List<Filter> getFilters() {
    return filtersMapper.toDomains(filtersRepository.findAll());
  }

  public Filter saveFilter(Filter updatedFilter) {
    FilterEntity entity = filtersMapper.toEntity(updatedFilter);
    entity.getCriteriaList().forEach(criteriaEntity -> criteriaEntity.setFilter(entity));
    return filtersMapper.toDomain(filtersRepository.save(entity));
  }

}
