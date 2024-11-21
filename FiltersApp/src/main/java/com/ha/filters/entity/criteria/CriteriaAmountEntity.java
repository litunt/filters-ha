package com.ha.filters.entity.criteria;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "criteria_amount", schema = "filters_schema")
public class CriteriaAmountEntity extends CriteriaEntity {

  @Column(nullable = false)
  private BigDecimal numberValue;

}
