package com.ha.filters.entity.criteria;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "criteria_title", schema = "filters_schema")
public class CriteriaTitleEntity extends CriteriaEntity {

  @Column(nullable = false)
  private String textValue;

}
