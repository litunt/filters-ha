package com.ha.filters.mapper;

import com.ha.filters.config.MapStructConfig;
import com.ha.filters.entity.SelectionEntity;
import com.ha.filters.model.Selection;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class)
public interface SelectionMapper {

  Selection toDomain(SelectionEntity entity);

  List<Selection> toDomainList(List<SelectionEntity> entityList);

  SelectionEntity toEntity(Selection domain);

}
