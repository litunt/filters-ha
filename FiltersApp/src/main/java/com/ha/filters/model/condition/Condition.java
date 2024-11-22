package com.ha.filters.model.condition;

import lombok.Data;

@Data
public abstract class Condition {

  private Long id;
  private String title;
  private String conditionType;

}
