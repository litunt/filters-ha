package com.ha.filters.model.criteria;

import com.ha.filters.model.condition.TextCondition;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CriteriaTitle extends Criteria {

  private TextCondition condition;
  private String textValue;
}
