package com.ha.filters.controller;

import com.ha.filters.model.FilterOptions;
import com.ha.filters.service.FilterOptionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter-options")
public class FilterOptionsController {

  private final FilterOptionsService filterOptionsService;

  @GetMapping
  public ResponseEntity<FilterOptions> getFilters() {
    return ResponseEntity.ok(filterOptionsService.getFilterOptions());
  }

}
