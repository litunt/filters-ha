package com.ha.filters.service;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import com.ha.filters.entity.SelectionEntity;
import com.ha.filters.entity.condition.ConditionEntity;
import com.ha.filters.mapper.ConditionMapper;
import com.ha.filters.mapper.SelectionMapper;
import com.ha.filters.model.FilterOptions;
import com.ha.filters.model.Selection;
import com.ha.filters.model.condition.AmountCondition;
import com.ha.filters.model.condition.Condition;
import com.ha.filters.model.condition.DateCondition;
import com.ha.filters.model.condition.TextCondition;
import com.ha.filters.repository.ConditionRepository;
import com.ha.filters.repository.SelectionRepository;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
    final var conditionTitle1 = "condition1";
    final var conditionTitle2 = "condition2";
    final var selectionTitle1 = "selection1";
    final var selectionTitle2 = "selection2";

    List<ConditionEntity> conditionEntities = List.of(
        new ConditionEntity(1L, conditionTitle1),
        new ConditionEntity(2L, conditionTitle2)
    );
    List<SelectionEntity> selectionEntities = List.of(
        new SelectionEntity(1L, selectionTitle1),
        new SelectionEntity(2L, selectionTitle2)
    );
    List<Condition> conditions = List.of(
        createAmountCondition(conditionTitle1),
        createTextCondition(conditionTitle2)
    );
    List<Selection> selections = List.of(
        new Selection(1L, selectionTitle1),
        new Selection(2L, selectionTitle2)
    );

    when(conditionRepository.findAll()).thenReturn(conditionEntities);
    when(selectionRepository.findAll()).thenReturn(selectionEntities);
    when(conditionMapper.mapToConditionsByType(conditionEntities)).thenReturn(conditions);
    when(selectionMapper.toDomainList(selectionEntities)).thenReturn(selections);

    Map<String, List<Condition>> expectedConditionsByType = Map.of(
        "AmountCondition", singletonList(createAmountCondition(conditionTitle1)),
        "TextCondition", singletonList(createTextCondition(conditionTitle2))
    );

    FilterOptions result = filterOptionsService.getFilterOptions();

    assertThat(result).isNotNull();
    assertThat(result.selections()).containsExactlyElementsOf(selections);
    assertThat(result.criteriaConditions())
        .hasSize(expectedConditionsByType.size())
        .containsExactlyInAnyOrderEntriesOf(expectedConditionsByType);

    verify(conditionRepository, times(1)).findAll();
    verify(selectionRepository, times(1)).findAll();
    verifyNoMoreInteractions(conditionRepository, selectionRepository);
  }

  @Test
  void getFilterOptions_whenRepositoriesReturnEmpty_shouldReturnEmptyFilterOptions() {
    when(conditionRepository.findAll()).thenReturn(emptyList());
    when(selectionRepository.findAll()).thenReturn(emptyList());
    when(conditionMapper.mapToConditionsByType(anyList())).thenReturn(emptyList());
    when(selectionMapper.toDomainList(anyList())).thenReturn(emptyList());

    FilterOptions result = filterOptionsService.getFilterOptions();

    assertThat(result).isNotNull();
    assertThat(result.selections()).isEmpty();
    assertThat(result.criteriaConditions()).isEmpty();

    verify(conditionRepository, times(1)).findAll();
    verify(selectionRepository, times(1)).findAll();
  }

  @Test
  void getFilterOptions_whenRepositoriesReturnNull_shouldHandleGracefully() {
    when(conditionRepository.findAll()).thenReturn(null);
    when(selectionRepository.findAll()).thenReturn(null);
    when(conditionMapper.mapToConditionsByType(null)).thenReturn(emptyList());
    when(selectionMapper.toDomainList(null)).thenReturn(emptyList());

    FilterOptions result = filterOptionsService.getFilterOptions();

    assertThat(result).isNotNull();
    assertThat(result.selections()).isEmpty();
    assertThat(result.criteriaConditions()).isEmpty();

    verify(conditionRepository, times(1)).findAll();
    verify(selectionRepository, times(1)).findAll();
  }

  @Test
  void getFilterOptions_whenMapperThrowsException_shouldPropagateException() {
    List<ConditionEntity> conditionEntities = List.of(
        new ConditionEntity(1L, "condition")
    );
    when(conditionRepository.findAll()).thenReturn(conditionEntities);
    when(conditionMapper.mapToConditionsByType(anyList()))
        .thenThrow(new RuntimeException("Mapping error"));

    assertThatThrownBy(() -> filterOptionsService.getFilterOptions())
        .isInstanceOf(RuntimeException.class)
        .hasMessageContaining("Mapping error");

    verify(conditionRepository, times(1)).findAll();
    verify(conditionMapper, times(1)).mapToConditionsByType(conditionEntities);
    verifyNoInteractions(selectionRepository, selectionMapper);
  }

  private Condition createAmountCondition(String title) {
    var condition = new AmountCondition();
    condition.setTitle(title);
    return condition;
  }

  private Condition createTextCondition(String title) {
    var condition = new TextCondition();
    condition.setTitle(title);
    return condition;
  }

  private Condition createDateCondition(String title) {
    var condition = new DateCondition();
    condition.setTitle(title);
    return condition;
  }
}

