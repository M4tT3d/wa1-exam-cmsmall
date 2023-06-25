-- SQLite
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS block;
DROP TABLE IF EXISTS global;

CREATE TABLE user (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    name TEXT,
    surname TEXT,
    role TEXT,
    salt TEXT,
    hash TEXT
);

CREATE TABLE article (
    articleId INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    publishedDate TEXT,
    createdAt TEXT,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES user(userId)
);

CREATE TABLE block (
    blockId INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    value TEXT,
    'order' INTEGER,
    articleId INTEGER,
    FOREIGN KEY (articleId) REFERENCES article(articleId)
);

CREATE TABLE global (
    type TEXT PRIMARY KEY,
    value TEXT
);

INSERT INTO global (type, value) VALUES ('title', 'CMSmall');

-- USERS
-- password
INSERT INTO user (email, name, surname, role, salt, hash) VALUES ('admin@email.com', 'Mario', 'Rossi', 'admin', '319b73c238fc18093e6c371bde12597b', '1aea6f19448253cfa63fee3685c315ce8c886ef1d78aa979e86cb1cca9d188c6');
-- password1
INSERT INTO user (email, name, surname, role, salt, hash) VALUES ('user1@email.com', 'Alex', 'Turner', 'user', '68c672902cb103c18c2b11583ebe5be3', '5a2bb8fdcce5ea79d1d02fc2f2e47b80c423c23d491b25e76aa313f0b9a4376b');
-- password2
INSERT INTO user (email, name, surname, role, salt, hash) VALUES ('user2@email.com', 'Matt', 'Bellamy', 'user', '39e6eaa90145aba012152196fbc32aea', 'a21f0b48182bf888bfca621ea8d71ce046609af88f953870d0c8d022db1f858c');
-- password3
INSERT INTO user (email, name, surname, role, salt, hash) VALUES ('user3@email.com', 'Dan', 'Reynolds', 'user', '37a7d1a971e6b0d74fc662dd961c0d6c', 'e34e8aabb57feea430aec7a554bcb6b79565e1195edcf5c70fc13ff85fe8a5e6');

-- ARTICLES
-- Matt Bellamy
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Compliance', '2024-03-17', '2022-03-17', 3);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Verona', '2024-08-26', '2022-08-26', 3);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Mercy', '2015-05-18', '2014-05-18', 3);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Psycho', '2019-01-02', '2019-01-02', 3);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Pressure', null, '2018-09-27', 3);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Dig Down', null, '2017-05-17', 3);
-- Dan Reynolds
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Lonely', '2024-09-03', '2021-09-03', 4);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Wrecked', '2024-07-02', '2019-07-02', 4);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Selene', '2009-09-30', '2009-09-30', 4);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('America', '2010-06-23', '2010-06-23', 4);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Natural', null, '2018-07-17', 4);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Machine', null, '2018-10-31', 4);

-- BLOCKS
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Will Of The People', 0, 1);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_1', 1, 1);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Compliance
We just need your compliance
You will feel no pain anymore
No more defiance
Just give us your compliance', 2, 1);
-- article 2
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Will Of The People', 0, 2);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_2', 1, 2);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Can we kiss, contagion on our lips?
Well, I don''t care
We can touch and feel forbidden bliss
They can''t stop us now, I won''t let you feel alone
Because I need you so', 2, 2);
-- article 3
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Drones', 0, 3);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_3', 1, 3);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Mercy, mercy
Show me mercy, from the powers that be
Show me mercy, can someone rescue me?', 2, 3);
-- article 4
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Drones', 0, 4);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_4', 1, 4);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Love, it will get you nowhere
You''re on your own
Lost in the wild
So come to me now
I could use someone like you
Someone who''ll kill on my command
And asks no questions', 2, 4);
-- article 5
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Simulation Theory ', 0, 5);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_5', 1, 5);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'I''m trapped and my back''s up against the wall
I see no solution or exit out
I''m grinding it out, no one can see
The pressure''s growing exponentially
I''m trying to keep up to speed with you
Your lane changing is oscillating me
I''m hitting the ground and I''m sprinting
I''m falling behind now I''m tuning out', 2, 5);
-- article 6
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Simulation Theory ', 0, 6);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_6', 1, 6);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'When hope and love has been lost and you fall to the ground
You must find a way
When the darkness descends and you''re told it''s the end
You must find a way', 2, 6);
-- article 7
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Mercury', 0, 7);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_1', 1, 7);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Sometimes, I can get a little
I can get a little lonely
Sometimes, I can get a little
I can get a little lonely', 2, 7);
-- article 8
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Mercury', 0, 8);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_2', 1, 8);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Days pass by, and my eyes, they dry, and I think that I''m okay
''Til I find myself in conversation, fading away
The way you smile, the way you walk
The time you took to teach me all that you had taught
Tell me, how am I supposed to move on?', 2, 8);
-- article 9
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Night Visions', 0, 9);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_3', 1, 9);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Resolutions and lovers in the kitchen
Love is clueless and destiny is wishin''
This is my heart, it''s on the line, Selene', 2, 9);
-- article 10
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Night Vision', 0, 10);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_4', 1, 10);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Rise to the top of the world
America, America, don''t you cry
Lift me up
Give me strength to press on
Rise to the top of the world
America, America, don''t you cry
Lift me up
Give me strength to press on', 2, 10);
-- article 11
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Origins', 0, 11);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_5', 1, 11);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Natural
A beating heart of stone
You gotta be so cold
To make it in this world
Yeah, you''re a natural
Living your life cutthroat
You gotta be so cold
Yeah, you''re a natural', 2, 11);
-- article 12
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Album: Origins', 0, 12);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_6', 1, 12);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Cause I''ve been wondering
When you gonna see I''m not for sale
I''ve been questioning
When you gonna see I''m not a part of your machine
Not a part of your machine', 2, 12);
