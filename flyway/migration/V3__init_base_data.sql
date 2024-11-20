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