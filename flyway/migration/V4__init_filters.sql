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


