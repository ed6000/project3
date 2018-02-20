\c planit_db

INSERT INTO users (username, password_digest, profile_avatar, hobbies)
VALUES
('maya', 'password', null, null),
('keisha', 'qwerty', null, null);

INSERT INTO events (user_id, title, start, end_time)
VALUES
(1, 'movies with Jane', '2018, 2, 1', '2018, 2, 2'),
(2, 'conderence in LA', '2018, 2, 5', '2018, 2, 6'),
(2, 'Brunch', '2018, 2, 10, 10:30:00', '2018, 2, 10, 12:30:00');

INSERT INTO invites (user_id_creator, user_id_invitee, event_id_creator, event_id, confirmation)
VALUES
(1, 2, 1, 2, null);

