package com.ha.filters.model.criteria;

import static com.ha.filters.util.constants.FiltersAppMessageConstants.VALIDATION_ERR_EMPTY;

import com.ha.filters.model.condition.AmountCondition;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CriteriaAmount extends Criteria {

  @NotNull(message = VALIDATION_ERR_EMPTY)
  private AmountCondition condition;

  @NotNull(message = VALIDATION_ERR_EMPTY)
  private BigDecimal numberValue;

}
