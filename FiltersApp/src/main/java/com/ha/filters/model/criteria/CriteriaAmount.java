package com.ha.filters.model.criteria;

import com.ha.filters.model.condition.AmountCondition;
import java.math.BigDecimal;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CriteriaAmount extends Criteria {

  private AmountCondition condition;
  private BigDecimal numberValue;

}
