\c planit_db

INSERT INTO users (username, password_digest, profile_avatar, hobbies)
VALUES
('maya', 'password', null, null),
('keisha', 'qwerty', null, null);

INSERT INTO events (user_id, event_time, event)
VALUES
(1, 'March 2nd, 2018', 'movies'),
(2, 'March 2nd, 2018', 'movies');

INSERT INTO invites (user_id_creator, user_id_invitee, event_id_creator, event_id, confirmation)
VALUES
(1, 2, 1, 2, null);

