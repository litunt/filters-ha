package com.ha.filters.mapper;

import com.ha.filters.config.MapStructConfig;
import com.ha.filters.entity.condition.AmountConditionEntity;
import com.ha.filters.entity.condition.ConditionEntity;
import com.ha.filters.entity.condition.DateConditionEntity;
import com.ha.filters.entity.condition.TextConditionEntity;
import com.ha.filters.model.condition.AmountCondition;
import com.ha.filters.model.condition.Condition;
import com.ha.filters.model.condition.DateCondition;
import com.ha.filters.model.condition.TextCondition;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(config = MapStructConfig.class)
public interface ConditionMapper {

  default List<Condition> mapToConditionsByType(List<ConditionEntity> entities) {
    return entities.stream().map(this::mapToConditionByType).toList();
  }

  @Named("mapToConditionByType")
  default Condition mapToConditionByType(ConditionEntity entity) {
    if (entity instanceof AmountConditionEntity amountConditionEntity) {
      return toAmountConditionDomain(amountConditionEntity);
    } else if (entity instanceof TextConditionEntity textConditionEntity) {
      return toTextConditionDomain(textConditionEntity);
    } else if (entity instanceof DateConditionEntity dateConditionEntity) {
      return toDateConditionDomain(dateConditionEntity);
    }
    return null;
  }

  AmountCondition toAmountConditionDomain(AmountConditionEntity entity);
  DateCondition toDateConditionDomain(DateConditionEntity entity);
  TextCondition toTextConditionDomain(TextConditionEntity entity);

  AmountConditionEntity toAmountConditionEntity(AmountCondition domain);
  DateConditionEntity toDateConditionEntity(DateCondition domain);
  TextConditionEntity toTextConditionEntity(TextCondition domain);

}
