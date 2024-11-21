CREATE SCHEMA IF NOT EXISTS filters_schema;

CREATE ROLE readwrite;

CREATE ROLE filters_user WITH
    LOGIN
    PASSWORD '123456'
    NOSUPERUSER
    NOCREATEDB
    CONNECTION LIMIT -1;

GRANT readwrite TO filters_user;

GRANT CONNECT ON DATABASE filtersdb TO readwrite;
GRANT USAGE ON SCHEMA filters_schema TO filters_user;

-- Reapply privileges for existing and future objects
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA filters_schema TO filters_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA filters_schema TO filters_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA filters_schema GRANT ALL ON TABLES TO filters_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA filters_schema GRANT ALL ON SEQUENCES TO filters_user;
