CREATE SCHEMA porfolio;
ALTER SCHEMA porfolio OWNER TO postgres;

COMMENT ON SCHEMA porfolio
    is 'SCHEMA for data';

/*
	Table definition script for porfolio schema
*/

-- Need this so that we can have columns of type uuid (binary uuid)
create extension "uuid-ossp";

CREATE TABLE porfolio.intro
(
    introid bigint not null,
    title varchar(50),
    message varchar(100),
    constraint pkintro
        primary key (introid)
);