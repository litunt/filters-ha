package com.ha.filters.validation;

import static jakarta.validation.Validation.buildDefaultValidatorFactory;
import static java.lang.String.format;
import static lombok.AccessLevel.PRIVATE;
import static org.apache.commons.lang3.ObjectUtils.isNotEmpty;

import com.ha.filters.exceptions.FiltersAppRestClientException;
import com.ha.filters.model.Filter;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.util.ArrayList;
import java.util.List;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@NoArgsConstructor(access = PRIVATE)
public class FilterValidator {

  private static final Validator validator;
  private static final String ERROR_MSG_TEMPLATE = "%s invalid: %s";

  static {
    try (var validatorFactory = buildDefaultValidatorFactory()) {
      validator = validatorFactory.getValidator();
    }
  }

  public static void validateRequest(Filter filterRequest) {
    var errors = new ArrayList<>(validator.validate(filterRequest));
    if (isNotEmpty(errors)) {
      throwFiltersAppServiceError(errors);
    }
  }

  private static <T> void throwFiltersAppServiceError(List<ConstraintViolation<T>> errors) {
    logErrors(errors);
    throw new FiltersAppRestClientException(format(ERROR_MSG_TEMPLATE, errors.get(0).getPropertyPath().toString(), errors.get(0).getInvalidValue()), errors.get(0).getMessage());
  }

  private static <T> void logErrors(List<ConstraintViolation<T>> errors) {
    errors.forEach(e -> log.error(format(ERROR_MSG_TEMPLATE, e.getPropertyPath().toString(), e.getInvalidValue())));
  }

}
