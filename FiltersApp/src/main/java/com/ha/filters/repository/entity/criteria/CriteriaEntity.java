package com.ha.filters.repository.entity.criteria;

import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.InheritanceType.JOINED;

import com.ha.filters.enums.CriteriaType;
import com.ha.filters.repository.entity.FilterEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

  @Column(nullable = false)
  private CriteriaType type;

  @ManyToOne(optional = false)
  @JoinColumn(name = "filter_id", referencedColumnName = "id")
  private FilterEntity filter;

}
