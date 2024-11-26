package com.ha.filters.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import com.ha.filters.entity.SelectionEntity;
import com.ha.filters.entity.condition.ConditionEntity;
import com.ha.filters.mapper.ConditionMapper;
import com.ha.filters.mapper.SelectionMapper;
import com.ha.filters.model.Selection;
import com.ha.filters.model.condition.Condition;
import com.ha.filters.repository.ConditionRepository;
import com.ha.filters.repository.SelectionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

@ExtendWith(MockitoExtension.class)
class FilterOptionsServiceTest {

  @Mock
  private ConditionRepository conditionRepository;

  @Mock
  private SelectionRepository selectionRepository;

  @Mock
  private SelectionMapper selectionMapper;

  @Mock
  private ConditionMapper conditionMapper;

  @InjectMocks
  private FilterOptionsService filterOptionsService;

  @Test
  void getFilterOptions_shouldReturnFilterOptions() {
    // Mock data
    List<ConditionEntity> conditionEntities = List.of(
        new ConditionEntity(1L, "type1", "value1"),
        new ConditionEntity(2L, "type2", "value2")
    );
    List<SelectionEntity> selectionEntities = List.of(
        new SelectionEntity(1L, "selection1"),
        new SelectionEntity(2L, "selection2")
    );
    List<Condition> conditions = List.of(
        new Condition("type1", "value1"),
        new Condition("type2", "value2")
    );
    List<Selection> selections = List.of(
        new Selection("selection1"),
        new Selection("selection2")
    );

    // Mock behavior
    when(conditionRepository.findAll()).thenReturn(conditionEntities);
    when(selectionRepository.findAll()).thenReturn(selectionEntities);
    when(conditionMapper.mapToConditionsByType(conditionEntities)).thenReturn(conditions);
    when(selectionMapper.toDomainList(selectionEntities)).thenReturn(selections);

    // Group conditions by type
    Map<String, List<Condition>> expectedConditionsByType = Map.of(
        "type1", List.of(new Condition("type1", "value1")),
        "type2", List.of(new Condition("type2", "value2"))
    );

    // Act
    FilterOptions result = filterOptionsService.getFilterOptions();

    // Assert
    assertThat(result).isNotNull();
    assertThat(result.getSelections()).containsExactlyElementsOf(selections);
    assertThat(result.getConditionsByType())
        .hasSize(expectedConditionsByType.size())
        .containsExactlyInAnyOrderEntriesOf(expectedConditionsByType);

    // Verify repository calls
    verify(conditionRepository, times(1)).findAll();
    verify(selectionRepository, times(1)).findAll();
    verifyNoMoreInteractions(conditionRepository, selectionRepository);
  }
}

