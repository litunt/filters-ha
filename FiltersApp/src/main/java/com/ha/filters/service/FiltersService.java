package com.ha.filters.service;

import static com.ha.filters.validation.FilterValidator.validateRequest;
import static java.lang.String.format;

import com.ha.filters.entity.FilterEntity;
import com.ha.filters.exceptions.FiltersAppRestClientException;
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

  public Filter saveFilter(Filter filterToSave) {
    validateRequest(filterToSave);
    FilterEntity entity = filtersMapper.toEntity(filterToSave);
    entity.getCriteriaList().forEach(criteriaEntity -> criteriaEntity.setFilter(entity));
    return filtersMapper.toDomain(filtersRepository.save(entity));
  }

  public void deleteFilter(Long filterId) {
    if (!filtersRepository.existsById(filterId)) {
      throw new FiltersAppRestClientException(format("Filter with ID %s does not exist", filterId), "resource.not.exist");
    }
    filtersRepository.deleteById(filterId);
  }

}
