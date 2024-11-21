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
import org.mapstruct.Named;

@Mapper(config = MapStructConfig.class)
public interface CriteriaMapper {

  @Named("mapToCriteriaByType")
  default Criteria mapToCriteriaByType(CriteriaEntity entity) {
    if (entity instanceof CriteriaAmountEntity) {
      return toCriteriaAmountDomain((CriteriaAmountEntity) entity);
    } else if (entity instanceof CriteriaTitleEntity) {
      return toCriteriaTitleDomain((CriteriaTitleEntity) entity);
    } else if (entity instanceof CriteriaDateEntity) {
      return toCriteriaDataDomain((CriteriaDateEntity) entity);
    }
    return null;
  }

  @Named("mapToCriteriaEntityByType")
  default CriteriaEntity mapToCriteriaEntityByType(Criteria domain) {
    if (domain instanceof CriteriaAmount) {
      return toCriteriaAmountEntity((CriteriaAmount) domain);
    } else if (domain instanceof CriteriaTitle) {
      return toCriteriaTitleEntity((CriteriaTitle) domain);
    } else if (domain instanceof CriteriaDate) {
      return toCriteriaDataEntity((CriteriaDate) domain);
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
