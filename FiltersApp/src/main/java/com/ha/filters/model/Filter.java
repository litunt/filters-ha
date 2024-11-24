package com.ha.filters.model;

import static com.ha.filters.util.constants.FiltersAppMessageConstants.VALIDATION_ERR_EMPTY;
import static com.ha.filters.util.constants.FiltersAppMessageConstants.VALIDATION_ERR_MIN_LENGTH;

import com.ha.filters.model.criteria.Criteria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record Filter (
    Long id,
    @NotBlank(message = VALIDATION_ERR_EMPTY)
    String name,
    @NotNull(message = VALIDATION_ERR_EMPTY)
    Selection selection,
    @NotNull(message = VALIDATION_ERR_EMPTY)
    @Size(min = 1, message = VALIDATION_ERR_MIN_LENGTH)
    List<Criteria> criteriaList
) {

}
