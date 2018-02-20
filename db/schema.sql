\c planit_db

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  profile_avatar VARCHAR,
  hobbies VARCHAR(255)
);

DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  id BIGSERIAL,
  user_id INTEGER REFERENCES users (id),
  title VARCHAR NOT NULL,
  start VARCHAR NOT NULL,
  end_time VARCHAR NOT NULL
);

DROP TABLE IF EXISTS invites CASCADE;

CREATE TABLE invites (
  id SERIAL,
  user_id_creator INTEGER REFERENCES users (id),
  user_id_invitee INTEGER,
  event_id_creator INTEGER,
  event_id INTEGER,
  confirmation BOOLEAN
);

