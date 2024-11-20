CREATE TABLE IF NOT EXISTS filters_schema.selection
(
    id    SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS filters_schema.filter
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR NOT NULL,
    selection_id BIGINT  NOT NULL,
    FOREIGN KEY (selection_id) REFERENCES filters_schema.selection (id)
);

CREATE TABLE IF NOT EXISTS filters_schema.condition
(
    id             SERIAL PRIMARY KEY,
    title          VARCHAR NOT NULL,
    condition_type VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS filters_schema.criteria
(
    id           SERIAL PRIMARY KEY,
    type         VARCHAR NOT NULL DEFAULT 'AMOUNT',
    filter_id    BIGINT  NOT NULL,
    condition_id BIGINT  NOT NULL,
    FOREIGN KEY (filter_id) REFERENCES filters_schema.filter (id),
    FOREIGN KEY (condition_id) REFERENCES filters_schema.condition (id)
);

CREATE TABLE IF NOT EXISTS filters_schema.criteria_amount
(
    id           SERIAL PRIMARY KEY,
    number_value DECIMAL(10) NOT NULL,
    FOREIGN KEY (id) REFERENCES filters_schema.criteria (id)
);

CREATE TABLE IF NOT EXISTS filters_schema.criteria_title
(
    id         SERIAL PRIMARY KEY,
    text_value VARCHAR NOT NULL,
    FOREIGN KEY (id) REFERENCES filters_schema.criteria (id)
);

CREATE TABLE IF NOT EXISTS filters_schema.criteria_date
(
    id         SERIAL PRIMARY KEY,
    date_value DATE NOT NULL,
    FOREIGN KEY (id) REFERENCES filters_schema.criteria (id)
);