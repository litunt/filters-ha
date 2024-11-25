package com.ha.filters.controller;

import static org.springframework.http.HttpStatus.OK;

import com.ha.filters.model.Filter;
import com.ha.filters.service.FiltersService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

  @PutMapping("/{filterId}")
  public ResponseEntity<Filter> updateFilter(@PathVariable Long filterId, @RequestBody Filter filter) {
    return ResponseEntity.ok(filtersService.saveFilter(filter));
  }

  @DeleteMapping("/{filterId}")
  public ResponseEntity<Void> deleteFilter(@PathVariable Long filterId) {
    filtersService.deleteFilter(filterId);
    return new ResponseEntity<>(OK);
  }

  @PostMapping
  public ResponseEntity<Filter> createFilter(@RequestBody Filter filter) {
    return ResponseEntity.ok(filtersService.saveFilter(filter));
  }
}
