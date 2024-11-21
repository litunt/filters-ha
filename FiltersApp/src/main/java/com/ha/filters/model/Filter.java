package com.ha.filters.model;

import com.ha.filters.model.criteria.Criteria;
import java.util.List;

public record Filter (
    Long id,
    String name,
    Selection selection,
    List<Criteria> criteriaList
) {

}
