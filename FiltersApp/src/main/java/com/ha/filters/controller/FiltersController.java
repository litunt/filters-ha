package com.ha.filters.controller;

import com.ha.filters.model.Filter;
import com.ha.filters.service.FiltersService;
import java.util.Collections;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filters")
public class FiltersController {

  private final FiltersService filtersService;

  @GetMapping
  public ResponseEntity<List<Filter>> getFilters() {
    return ResponseEntity.ok(filtersService.getFilters());
  }
}
