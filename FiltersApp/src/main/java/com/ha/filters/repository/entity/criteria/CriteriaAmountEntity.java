package com.ha.filters.repository.entity.criteria;

import com.ha.filters.repository.entity.condition.AmountConditionEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "criteria_amount", schema = "filters_schema")
public class CriteriaAmountEntity extends CriteriaEntity {

  @OneToOne
  @JoinColumn(name = "condition_id", referencedColumnName = "id")
  private AmountConditionEntity condition;

  @Column(nullable = false)
  private BigDecimal numberValue;

}
