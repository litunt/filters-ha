package com.ha.filters.integration;

import static com.ha.filters.TestUtils.fixCriteriaType;
import static com.ha.filters.TestUtils.readResourceAsString;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.type.TypeReference;
import com.ha.filters.TestUtils;
import com.ha.filters.model.Filter;
import jakarta.transaction.Transactional;
import java.util.List;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.http.MediaType;

@Transactional
class FiltersIntegrationTest extends IntegrationTest {

  @ParameterizedTest
  @CsvSource(value = "json/filtersResponse.json")
  void testGetFilters(String responseFile) throws Exception {
    var response = mockMvc.perform(get("/filters")
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsString();

    var actualResponse = objectMapper.readValue(response, new TypeReference<List<Filter>>() {});
    var expectedResponse = objectMapper.readValue(readResourceAsString(responseFile), new TypeReference<List<Filter>>() {});
    expectedResponse.forEach(TestUtils::fixCriteriaType);
    checkAndAssert(actualResponse, expectedResponse);
  }

  @ParameterizedTest
  @CsvSource(value = "json/filterRequest.json")
  void testCreateFilter(String requestFile) throws Exception {
    var response = mockMvc.perform(post("/filters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(readResourceAsString(requestFile)))
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsString();

    var actualResponse = objectMapper.readValue(response, Filter.class);
    var expectedResponse = objectMapper.readValue(readResourceAsString(requestFile), Filter.class);
    fixCriteriaType(expectedResponse);
    checkAndAssert(actualResponse, expectedResponse);
  }

  @ParameterizedTest
  @CsvSource(value = "json/filterUpdateRequest_id2.json")
  void testUpdateFilter(String updateRequestFile) throws Exception {
    var updateResourceStr = readResourceAsString(updateRequestFile);

    var updateResponse = mockMvc.perform(put("/filters/2")
            .contentType(MediaType.APPLICATION_JSON)
            .content(updateResourceStr))
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsString();

    var actualResponse = objectMapper.readValue(updateResponse, Filter.class);
    var expectedResponse = objectMapper.readValue(updateResourceStr, Filter.class);
    fixCriteriaType(expectedResponse);
    checkAndAssert(actualResponse, expectedResponse);
  }


  @ParameterizedTest
  @CsvSource(value = "json/filterRequest.json")
  void testDeleteFilter(String requestFile) throws Exception {
    var response = mockMvc.perform(post("/filters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(readResourceAsString(requestFile)))
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsString();

    var savedFilterResponse = objectMapper.readValue(response, Filter.class);

    var responseAll = mockMvc.perform(get("/filters")
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsString();

    var responseAllFilters = objectMapper.readValue(responseAll, new TypeReference<List<Filter>>() {});
    assertThat(responseAllFilters).hasSize(3);

    mockMvc.perform(delete("/filters/" + savedFilterResponse.id())
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    var responseAll2 = mockMvc.perform(get("/filters")
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andReturn()
        .getResponse()
        .getContentAsString();

    var responseAllFilters2 = objectMapper.readValue(responseAll2, new TypeReference<List<Filter>>() {});
    assertThat(responseAllFilters2).hasSize(2);
  }

  private void checkAndAssert(Filter actualResponse, Filter expectedResponse) {
    assertThat(actualResponse)
        .usingRecursiveComparison()
        .ignoringFieldsMatchingRegexes(".*id")
        .isEqualTo(expectedResponse);
  }

  private void checkAndAssert(List<Filter> actualResponse, List<Filter> expectedResponse) {
    assertThat(actualResponse)
        .usingRecursiveComparison()
        .ignoringFieldsMatchingRegexes(".*id")
        .isEqualTo(expectedResponse);
  }
}

