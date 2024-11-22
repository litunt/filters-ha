package com.ha.filters.service;

import static java.util.stream.Collectors.groupingBy;

import com.ha.filters.mapper.ConditionMapper;
import com.ha.filters.mapper.SelectionMapper;
import com.ha.filters.model.FilterOptions;
import com.ha.filters.model.Selection;
import com.ha.filters.model.condition.Condition;
import com.ha.filters.repository.ConditionRepository;
import com.ha.filters.repository.SelectionRepository;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FilterOptionsService {

  private final ConditionRepository conditionRepository;
  private final SelectionRepository selectionRepository;
  private final SelectionMapper selectionMapper;
  private final ConditionMapper conditionMapper;

  public FilterOptions getFilterOptions() {
    List<Condition> conditions = conditionMapper.mapToConditionsByType(conditionRepository.findAll());
    List<Selection> selections = selectionMapper.toDomainList(selectionRepository.findAll());
    Map<String, List<Condition>> conditionsByType = conditions.stream()
        .collect(
            groupingBy(Condition::getConditionType)
        );


    return new FilterOptions(selections, conditionsByType);
  }

}
