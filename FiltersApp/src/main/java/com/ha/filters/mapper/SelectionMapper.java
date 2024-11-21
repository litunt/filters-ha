package com.ha.filters.mapper;

import com.ha.filters.config.MapStructConfig;
import com.ha.filters.entity.SelectionEntity;
import com.ha.filters.model.Selection;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface SelectionMapper {

  Selection toDomain(SelectionEntity entity);

  SelectionEntity toEntity(Selection domain);

}
