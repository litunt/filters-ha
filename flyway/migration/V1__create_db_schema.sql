CREATE SCHEMA IF NOT EXISTS filters_schema;

CREATE ROLE readwrite;

CREATE ROLE filters_user WITH
    LOGIN
    PASSWORD '123456'
    NOSUPERUSER
    NOCREATEDB
    CONNECTION LIMIT -1;

GRANT CONNECT ON DATABASE filtersdb TO readwrite;

GRANT readwrite TO filters_user;