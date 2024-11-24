package com.ha.filters.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FiltersAppRestClientException extends RuntimeException {
  private final String code;

  public FiltersAppRestClientException(String message, String code) {
    super(message);
    this.code = code;
  }

}
