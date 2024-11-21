package com.ha.filters.entity.criteria;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "criteria_date", schema = "filters_schema")
public class CriteriaDateEntity extends CriteriaEntity {

  @Column(nullable = false)
  private LocalDate dateValue;

}
