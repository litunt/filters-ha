package com.ha.filters.service;

import static java.math.BigDecimal.TEN;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ha.filters.entity.FilterEntity;
import com.ha.filters.entity.SelectionEntity;
import com.ha.filters.entity.condition.AmountConditionEntity;
import com.ha.filters.entity.criteria.CriteriaAmountEntity;
import com.ha.filters.exceptions.FiltersAppRestClientException;
import com.ha.filters.mapper.FiltersMapper;
import com.ha.filters.model.Filter;
import com.ha.filters.model.Selection;
import com.ha.filters.model.condition.AmountCondition;
import com.ha.filters.model.criteria.CriteriaAmount;
import com.ha.filters.repository.FiltersRepository;
import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class FiltersServiceTest {

  @Mock
  private FiltersMapper filtersMapper;

  @Mock
  private FiltersRepository filtersRepository;

  @InjectMocks
  private FiltersService filtersService;

  private static Filter filter;
  private static FilterEntity filterEntity;

  @BeforeEach
  void setUp() {
    final var criteria = new CriteriaAmount();
    criteria.setNumberValue(TEN);
    criteria.setCondition(new AmountCondition());
    final var criteriaEntity = new CriteriaAmountEntity();
    criteriaEntity.setNumberValue(TEN);
    criteriaEntity.setCondition(new AmountConditionEntity());
    filter = new Filter(1L, "Test Filter", new Selection(1L, "selection"), singletonList(criteria));
    filterEntity = new FilterEntity(1L, "Test Filter", new SelectionEntity(1L, "selection"), singletonList(criteriaEntity));
    filterEntity.setId(1L);
  }

  @Test
  void testGetFilters() {
    FilterEntity entity = new FilterEntity();
    List<FilterEntity> entityList = List.of(entity);
    when(filtersRepository.findAll()).thenReturn(entityList);
    when(filtersMapper.toDomains(entityList)).thenReturn(List.of(filter));

    List<Filter> filters = filtersService.getFilters();

    assertThat(filters).hasSize(1);
    assertThat(filters.get(0).name()).isEqualTo("Test Filter");

    verify(filtersRepository, times(1)).findAll();
    verify(filtersMapper, times(1)).toDomains(entityList);
  }

  @Test
  void testSaveFilter() {
    when(filtersMapper.toEntity(any(Filter.class))).thenReturn(filterEntity);
    when(filtersRepository.save(any(FilterEntity.class))).thenReturn(filterEntity);
    when(filtersMapper.toDomain(any(FilterEntity.class))).thenReturn(filter);

    Filter savedFilter = filtersService.saveFilter(filter);

    assertThat(savedFilter).isNotNull();
    assertThat(savedFilter.name()).isEqualTo("Test Filter");

    verify(filtersMapper, times(1)).toEntity(filter);
    verify(filtersRepository, times(1)).save(filterEntity);
    verify(filtersMapper, times(1)).toDomain(filterEntity);
  }

  @Test
  void testDeleteFilter_FilterExists() {
    when(filtersRepository.existsById(1L)).thenReturn(true);

    filtersService.deleteFilter(1L);

    verify(filtersRepository, times(1)).existsById(1L);
    verify(filtersRepository, times(1)).deleteById(1L);
  }

  @Test
  void testDeleteFilter_FilterDoesNotExist() {
    when(filtersRepository.existsById(1L)).thenReturn(false);

    assertThatThrownBy(() -> filtersService.deleteFilter(1L))
        .isInstanceOf(FiltersAppRestClientException.class)
        .hasMessageContaining("Filter with ID 1 does not exist");

    verify(filtersRepository, times(1)).existsById(1L);
    verify(filtersRepository, times(0)).deleteById(1L);
  }
}

