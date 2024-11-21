package com.ha.filters.mapper;

import com.ha.filters.entity.condition.AmountConditionEntity;
import com.ha.filters.entity.condition.DateConditionEntity;
import com.ha.filters.entity.condition.TextConditionEntity;
import com.ha.filters.model.condition.AmountCondition;
import com.ha.filters.model.condition.DateCondition;
import com.ha.filters.model.condition.TextCondition;

public interface ConditionMapper {

  AmountCondition toAmountConditionDomain(AmountConditionEntity entity);
  DateCondition toDateConditionDomain(DateConditionEntity entity);
  TextCondition toTextConditionDomain(TextConditionEntity entity);

}
