package com.ha.filters.mapper;

import com.ha.filters.config.MapStructConfig;
import com.ha.filters.entity.FilterEntity;
import com.ha.filters.model.Filter;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
    config = MapStructConfig.class,
    uses = {
        SelectionMapper.class,
        CriteriaMapper.class
    }
)
public interface FiltersMapper {

  @Mapping(source = "criteriaList", target = "criteriaList", qualifiedByName = "mapToCriteriaByType")
  Filter toDomain(FilterEntity entity);

  @Mapping(source = "criteriaList", target = "criteriaList", qualifiedByName = "mapToCriteriaEntityByType")
  FilterEntity toEntity(Filter domain);

  List<Filter> toDomains(List<FilterEntity> entities);

}
