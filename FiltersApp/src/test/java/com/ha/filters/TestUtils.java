package com.ha.filters;

import static com.ha.filters.enums.CriteriaType.AMOUNT;
import static com.ha.filters.enums.CriteriaType.DATE;
import static com.ha.filters.enums.CriteriaType.TITLE;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.util.StreamUtils.copyToString;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ha.filters.model.Filter;
import com.ha.filters.model.criteria.CriteriaAmount;
import com.ha.filters.model.criteria.CriteriaDate;
import com.ha.filters.model.criteria.CriteriaTitle;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import lombok.NonNull;
import org.springframework.core.io.ClassPathResource;

public class TestUtils {

  public static void fixCriteriaType(Filter filter) {
    filter.criteriaList().forEach(criteria -> {
      if (criteria instanceof CriteriaAmount) {
        criteria.setType(AMOUNT);
      } else if (criteria instanceof CriteriaTitle) {
        criteria.setType(TITLE);
      } else if (criteria instanceof CriteriaDate) {
        criteria.setType(DATE);
      }
    });
  }

  public static <T> T testDataJson(String path, ObjectMapper objectMapper, Class<T> clazz)
      throws IOException {
    return objectMapper.readValue(readResourceAsString(path), clazz);
  }

  public static <T> List<T> testDataJsonList(String path, ObjectMapper objectMapper)
      throws IOException {
    return objectMapper.readValue(readResourceAsString(path), new TypeReference<>() {
    });
  }

  public static String readResourceAsString(@NonNull String path) throws IOException {
    ClassPathResource resource = new ClassPathResource(path);
    if (!resource.exists()) {
      throw new FileNotFoundException(path);
    }
    try (InputStream stream = resource.getInputStream()) {
      return readFromStream(stream);
    }
  }

  private static String readFromStream(InputStream inputStream) throws IOException {
    return copyToString(inputStream, UTF_8);
  }

}
