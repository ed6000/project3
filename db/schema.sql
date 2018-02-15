\c calendar_db

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL
);

DROP TABLE IF EXISTS calendars;

CREATE TABLE calendars (
  id SERIAL,
  
);