package com.ha.filters.model.criteria;

import static com.ha.filters.util.constants.FiltersAppMessageConstants.VALIDATION_ERR_EMPTY;

import com.ha.filters.model.condition.TextCondition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CriteriaTitle extends Criteria {

  @NotNull(message = VALIDATION_ERR_EMPTY)
  private TextCondition condition;

  @NotBlank(message = VALIDATION_ERR_EMPTY)
  private String textValue;
}
