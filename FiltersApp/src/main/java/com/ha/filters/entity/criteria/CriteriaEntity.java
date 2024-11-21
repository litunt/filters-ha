package com.ha.filters.entity.criteria;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.InheritanceType.JOINED;

import com.ha.filters.entity.FilterEntity;
import com.ha.filters.entity.condition.AmountConditionEntity;
import com.ha.filters.entity.condition.ConditionEntity;
import com.ha.filters.enums.CriteriaType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = JOINED)
@Table(name = "criteria", schema = "filters_schema")
public abstract class CriteriaEntity {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(nullable = false)
  private Long id;

  @Enumerated(STRING)
  @Column(nullable = false)
  private CriteriaType type;

  @ManyToOne(optional = false)
  @JoinColumn(name = "filter_id", referencedColumnName = "id")
  private FilterEntity filter;

  @ManyToOne(optional = false)
  @JoinColumn(name = "condition_id", referencedColumnName = "id")
  private ConditionEntity condition;

}
