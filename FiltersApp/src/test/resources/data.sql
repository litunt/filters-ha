CREATE SCHEMA IF NOT EXISTS filters_schema;

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
    FOREIGN KEY (filter_id) REFERENCES filters_schema.filter (id) ON DELETE CASCADE,
    FOREIGN KEY (condition_id) REFERENCES filters_schema.condition (id)
);

CREATE TABLE IF NOT EXISTS filters_schema.criteria_amount
(
    id           SERIAL PRIMARY KEY,
    number_value DECIMAL(10) NOT NULL,
    FOREIGN KEY (id) REFERENCES filters_schema.criteria (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS filters_schema.criteria_title
(
    id         SERIAL PRIMARY KEY,
    text_value VARCHAR NOT NULL,
    FOREIGN KEY (id) REFERENCES filters_schema.criteria (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS filters_schema.criteria_date
(
    id         SERIAL PRIMARY KEY,
    date_value DATE NOT NULL,
    FOREIGN KEY (id) REFERENCES filters_schema.criteria (id) ON DELETE CASCADE
);

INSERT INTO filters_schema.selection (title) VALUES ('Select 1');
INSERT INTO filters_schema.selection (title) VALUES ('Select 2');
INSERT INTO filters_schema.selection (title) VALUES ('Select 3');

INSERT INTO filters_schema.condition (title, condition_type) VALUES ('More', 'AmountCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Less', 'AmountCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Equals', 'AmountCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('More or equals', 'AmountCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Less or equals', 'AmountCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Not equal', 'AmountCondition');

INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Starts with', 'TextCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Ends with', 'TextCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Contains', 'TextCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Does not contain', 'TextCondition');

INSERT INTO filters_schema.condition (title, condition_type) VALUES ('From', 'DateCondition');
INSERT INTO filters_schema.condition (title, condition_type) VALUES ('Until', 'DateCondition');

INSERT INTO filters_schema.filter (name, selection_id)
VALUES ('My Filter 1', (select id
                        from filters_schema.selection
                        where title = 'Select 1'));

INSERT INTO filters_schema.criteria (type, filter_id, condition_id)
VALUES ('TITLE', (select id from filters_schema.filter where name = 'My Filter 1'),
        (select id from filters_schema.condition where condition_type = 'TextCondition' and title = 'Starts with'));

INSERT INTO filters_schema.criteria_title (id, text_value)
VALUES ((select max(id) from filters_schema.criteria), 'Meow');

-----------------------------

INSERT INTO filters_schema.filter (name, selection_id)
VALUES ('My Filter 2', (select id
                        from filters_schema.selection
                        where title = 'Select 3'));

INSERT INTO filters_schema.criteria (filter_id, condition_id)
VALUES ((select id from filters_schema.filter where name = 'My Filter 2'),
        (select id from filters_schema.condition where condition_type = 'AmountCondition' and title = 'More'));

INSERT INTO filters_schema.criteria_amount (id, number_value)
VALUES ((select max(id) from filters_schema.criteria), 50);

INSERT INTO filters_schema.criteria (type, filter_id, condition_id)
VALUES ('DATE', (select id from filters_schema.filter where name = 'My Filter 2'),
        (select id from filters_schema.condition where condition_type = 'DateCondition' and title = 'From'));

INSERT INTO filters_schema.criteria_date (id, date_value)
VALUES ((select max(id) from filters_schema.criteria), to_date('25-10-2021', 'DD-MM-YYYY'));


