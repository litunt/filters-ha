package com.ha.filters.model.criteria;

import com.ha.filters.model.condition.DateCondition;
import java.time.LocalDate;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CriteriaDate extends Criteria {

  private DateCondition condition;
  private LocalDate dateValue;

}
