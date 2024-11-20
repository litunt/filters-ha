package com.ha.filters.repository.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

import com.ha.filters.repository.entity.criteria.CriteriaEntity;
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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "filter", schema = "filters_schema")
public class FilterEntity {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(nullable = false)
  private Long id;

  @Column(nullable = false)
  private String name;

  @OneToOne(mappedBy = "filter")
  @JoinColumn(name = "selection_id", referencedColumnName = "id")
  private SelectionEntity selection;

  @OneToMany(mappedBy = "filter")
  @OnDelete(action = CASCADE)
  private List<CriteriaEntity> criteriaList;

}
