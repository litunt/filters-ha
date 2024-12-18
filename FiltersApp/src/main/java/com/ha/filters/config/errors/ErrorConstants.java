package com.ha.filters.config.errors;

import static lombok.AccessLevel.PRIVATE;

import lombok.NoArgsConstructor;

@NoArgsConstructor(access = PRIVATE)
public class ErrorConstants {

  public static final String ERROR_CLIENT_EXCEPTION = "error.client.exception";
  public static final String ERROR_REST_CLIENT_EXCEPTION = "error.rest.client.exception";
  public static final String ERROR_EMPTY_RESULT_DATA_ACCESS = "error.empty.result.data.access";
  public static final String ERROR_DATA_INTEGRITY_ERROR = "error.data.integrity.error";
  public static final String ERROR_TIMEOUT = "error.timeout";
  public static final String ERROR_INTERNAL_SERVER_ERROR = "error.internal.server.error";
  public static final String ERROR_DATE_TIME_PARSE_EXCEPTION = "error.date.time.parse.exception";
}
