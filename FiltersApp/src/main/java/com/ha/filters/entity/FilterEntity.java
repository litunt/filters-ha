package com.ha.filters.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

import com.ha.filters.entity.criteria.CriteriaEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "filter", schema = "filters_schema")
public class FilterEntity {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(nullable = false)
  private Long id;

  @Column(nullable = false)
  private String name;

  @OneToOne
  @JoinColumn(name = "selection_id", referencedColumnName = "id")
  private SelectionEntity selection;

  @OneToMany(mappedBy = "filter")
  @OnDelete(action = CASCADE)
  private List<CriteriaEntity> criteriaList;

}
