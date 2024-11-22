package com.ha.filters.model;

import com.ha.filters.model.condition.Condition;
import java.util.List;
import java.util.Map;

public record FilterOptions(
    List<Selection> selections,
    Map<String, List<Condition>> criteriaConditions
) {

}
