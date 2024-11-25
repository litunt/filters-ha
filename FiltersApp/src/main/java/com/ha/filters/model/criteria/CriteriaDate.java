package com.ha.filters.model.criteria;

import static com.ha.filters.util.constants.FiltersAppMessageConstants.VALIDATION_ERR_EMPTY;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ha.filters.model.condition.DateCondition;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CriteriaDate extends Criteria {

  @NotNull(message = VALIDATION_ERR_EMPTY)
  private DateCondition condition;

  @JsonFormat(pattern = "dd.MM.yyyy")
  @NotNull(message = VALIDATION_ERR_EMPTY)
  private LocalDate dateValue;

}
