CREATE TABLE IF NOT EXISTS filter (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS selection (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    filter_id BIGINT NOT NULL,
    FOREIGN KEY (filter_id) REFERENCES filter(id)
);

CREATE TABLE IF NOT EXISTS criteria (
    id SERIAL PRIMARY KEY,
    type VARCHAR NOT NULL DEFAULT 'AMOUNT',
    filter_id BIGINT NOT NULL,
    FOREIGN KEY (filter_id) REFERENCES filter(id)
);

CREATE TABLE IF NOT EXISTS criteria_amount (
    id SERIAL PRIMARY KEY,
    condition VARCHAR NOT NULL,
    number_value INT NOT NULL,
    FOREIGN KEY (id) REFERENCES criteria(id)
);

CREATE TABLE IF NOT EXISTS criteria_title (
    id SERIAL PRIMARY KEY,
    condition VARCHAR NOT NULL,
    text_value INT NOT NULL,
    FOREIGN KEY (id) REFERENCES criteria(id)
);

CREATE TABLE IF NOT EXISTS criteria_date (
    id SERIAL PRIMARY KEY,
    condition VARCHAR NOT NULL,
    date_value INT NOT NULL,
    FOREIGN KEY (id) REFERENCES criteria(id)
);