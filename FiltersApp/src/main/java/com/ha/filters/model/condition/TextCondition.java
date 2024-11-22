package com.ha.filters.model.condition;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TextCondition extends Condition {

  private String conditionType = "TextCondition";

}
