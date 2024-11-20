package com.ha.filters.repository.entity.criteria;

import com.ha.filters.repository.entity.condition.TextConditionEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Table(name = "criteria_title", schema = "filters_schema")
public class CriteriaTitleEntity extends CriteriaEntity {

  @OneToOne
  @JoinColumn(name = "condition_id", referencedColumnName = "id")
  private TextConditionEntity condition;

  @Column(nullable = false)
  private String textValue;

}
