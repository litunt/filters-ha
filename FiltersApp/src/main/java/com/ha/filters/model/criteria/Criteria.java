package com.ha.filters.model.criteria;

import com.ha.filters.enums.CriteriaType;
import lombok.Data;

@Data
public abstract class Criteria {

  private Long id;

  private CriteriaType type;
}
