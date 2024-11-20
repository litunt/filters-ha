package com.ha.filters.repository.entity.criteria;

import com.ha.filters.repository.entity.condition.AmountConditionEntity;
import com.ha.filters.repository.entity.condition.DateConditionEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
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
@Table(name = "criteria_date", schema = "filters_schema")
public class CriteriaDateEntity extends CriteriaEntity {

  @OneToOne
  @JoinColumn(name = "condition_id", referencedColumnName = "id")
  private DateConditionEntity condition;

  @Column(nullable = false)
  private LocalDate dateValue;

}
