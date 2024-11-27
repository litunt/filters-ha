package com.ha.filters.validation;

import static com.ha.filters.enums.CriteriaType.DATE;
import static com.ha.filters.enums.CriteriaType.TITLE;
import static java.math.BigDecimal.TEN;
import static java.util.Collections.emptyList;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ha.filters.enums.CriteriaType;
import com.ha.filters.exceptions.FiltersAppRestClientException;
import com.ha.filters.model.Filter;
import com.ha.filters.model.Selection;
import com.ha.filters.model.condition.AmountCondition;
import com.ha.filters.model.condition.DateCondition;
import com.ha.filters.model.condition.TextCondition;
import com.ha.filters.model.criteria.Criteria;
import com.ha.filters.model.criteria.CriteriaAmount;
import com.ha.filters.model.criteria.CriteriaDate;
import com.ha.filters.model.criteria.CriteriaTitle;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Stream;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ActiveProfiles({"test"})
@ExtendWith({SpringExtension.class})
class FilterValidatorTest {

  @ParameterizedTest
  @MethodSource("filterInvalidParameters")
  void testValidateRequestShouldThrowError(Filter filterRequest) {
    assertThatThrownBy(() -> FilterValidator.validateRequest(filterRequest))
        .isInstanceOf(FiltersAppRestClientException.class)
        .hasMessageContaining("invalid");
  }

  @ParameterizedTest
  @MethodSource("filterOkParameters")
  void testValidateRequestSuccess(Filter filterRequest) {
    assertThatCode(() -> FilterValidator.validateRequest(filterRequest))
        .doesNotThrowAnyException();
  }

  private static Stream<Arguments> filterInvalidParameters() {
    return Stream.of(
        Arguments.of(new Filter(1L, "", new Selection(1L, "selection 1"), List.of(createCriteria(TITLE)))),
        Arguments.of(new Filter(1L, null, new Selection(1L, "selection 1"), List.of(createCriteria(TITLE)))),
        Arguments.of(new Filter(1L, "My Filter", null, List.of(createCriteria(TITLE)))),
        Arguments.of(new Filter(1L, "My Filter", new Selection(1L, "selection 1"), emptyList())),
        Arguments.of(new Filter(1L, "My Filter", new Selection(1L, "selection 1"), null)),
        Arguments.of(new Filter(1L, "My Filter", new Selection(1L, "selection 1"), List.of(new CriteriaDate()))),
        Arguments.of(new Filter(1L, "My Filter", new Selection(1L, "selection 1"), List.of(new CriteriaTitle()))),
        Arguments.of(new Filter(1L, "My Filter", new Selection(1L, "selection 1"), List.of(new CriteriaAmount())))
    );
  }

  private static Stream<Arguments> filterOkParameters() {
    return Stream.of(
        Arguments.of(new Filter(1L, "My Filter", new Selection(1L, "selection 1"), List.of(createCriteria(TITLE)))),
        Arguments.of(new Filter(1L, "My Filter", new Selection(1L, "selection 1"), List.of(createCriteria(TITLE), createCriteria(DATE))))
    );
  }

  private static Criteria createCriteria(CriteriaType type) {
    switch (type) {
      case DATE -> {
        var c = new CriteriaDate();
        c.setCondition(createDateCondition("From"));
        c.setDateValue(LocalDate.now());
        return c;
      }
      case TITLE -> {
        var c = new CriteriaTitle();
        c.setCondition(createTextCondition("Starts"));
        c.setTextValue("hello");
        return c;
      }
      case AMOUNT -> {
        var c = new CriteriaAmount();
        c.setCondition(createAmountCondition("More"));
        c.setNumberValue(TEN);
        return c;
      }
    }
    return new CriteriaDate();
  }

  private static AmountCondition createAmountCondition(String title) {
    var condition = new AmountCondition();
    condition.setTitle(title);
    return condition;
  }

  private static TextCondition createTextCondition(String title) {
    var condition = new TextCondition();
    condition.setTitle(title);
    return condition;
  }

  private static DateCondition createDateCondition(String title) {
    var condition = new DateCondition();
    condition.setTitle(title);
    return condition;
  }

}

