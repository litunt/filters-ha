package com.ha.filters.model.criteria;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.ha.filters.enums.CriteriaType;
import lombok.Data;

@Data
@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    property = "type"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = CriteriaAmount.class, name = "AMOUNT"),
    @JsonSubTypes.Type(value = CriteriaDate.class, name = "DATE"),
    @JsonSubTypes.Type(value = CriteriaTitle.class, name = "TITLE")
})
public abstract class Criteria {

  private Long id;

  private CriteriaType type;

  @JsonCreator
  public static CriteriaType fromString(String value) {
    return CriteriaType.valueOf(value.toUpperCase());
  }
}
