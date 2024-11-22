package com.ha.filters.mapper;

import com.ha.filters.config.MapStructConfig;
import com.ha.filters.entity.criteria.CriteriaAmountEntity;
import com.ha.filters.entity.criteria.CriteriaDateEntity;
import com.ha.filters.entity.criteria.CriteriaEntity;
import com.ha.filters.entity.criteria.CriteriaTitleEntity;
import com.ha.filters.model.criteria.Criteria;
import com.ha.filters.model.criteria.CriteriaAmount;
import com.ha.filters.model.criteria.CriteriaDate;
import com.ha.filters.model.criteria.CriteriaTitle;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(
    config = MapStructConfig.class,
    uses = {
        ConditionMapper.class
    }
)
public interface CriteriaMapper {

  @Named("mapToCriteriaByType")
  default Criteria mapToCriteriaByType(CriteriaEntity entity) {
    if (entity instanceof CriteriaAmountEntity criteriaAmountEntity) {
      return toCriteriaAmountDomain(criteriaAmountEntity);
    } else if (entity instanceof CriteriaTitleEntity criteriaTitleEntity) {
      return toCriteriaTitleDomain(criteriaTitleEntity);
    } else if (entity instanceof CriteriaDateEntity criteriaDateEntity) {
      return toCriteriaDataDomain(criteriaDateEntity);
    }
    return null;
  }

  @Named("mapToCriteriaEntityByType")
  default CriteriaEntity mapToCriteriaEntityByType(Criteria domain) {
    if (domain instanceof CriteriaAmount criteriaAmount) {
      return toCriteriaAmountEntity(criteriaAmount);
    } else if (domain instanceof CriteriaTitle criteriaTitle) {
      return toCriteriaTitleEntity(criteriaTitle);
    } else if (domain instanceof CriteriaDate criteriaDate) {
      return toCriteriaDataEntity(criteriaDate);
    }
    return null;
  }

  CriteriaAmount toCriteriaAmountDomain(CriteriaAmountEntity entity);
  CriteriaTitle toCriteriaTitleDomain(CriteriaTitleEntity entity);
  CriteriaDate toCriteriaDataDomain(CriteriaDateEntity entity);

  CriteriaAmountEntity toCriteriaAmountEntity(CriteriaAmount domain);
  CriteriaTitleEntity toCriteriaTitleEntity(CriteriaTitle domain);
  CriteriaDateEntity toCriteriaDataEntity(CriteriaDate domain);

}
