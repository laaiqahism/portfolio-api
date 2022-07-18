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

CREATE TABLE porfolio.users
(
    userid uuid,
    firstname varchar(50),
    surname varchar(50),
    phoneNumber varchar(10),
    email varchar(50),
    gender varchar(10),
    isActive boolean,
    constraint pkuserid
        primary key(userid)
);

CREATE TABLE porfolio.userrole
(
    roleid SERIAL,
    userid uuid,
    isActive boolean,
    constraint pkuserroleid
        primary key(roleid),
    FOREIGN KEY(userid) 
    REFERENCES porfolio.users(userid)
);

CREATE TABLE porfolio.roleid
(
    roleid SERIAL,
    roleName varchar(50),
    isActive boolean,
    constraint pkroleid
        primary key(roleid),
    FOREIGN KEY(roleid) 
    REFERENCES porfolio.userrole(roleid)
);