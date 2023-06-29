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
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Article 1', '2019-01-01', '2024-01-01', 2);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Article 2', '2019-01-02', '2019-01-02', 3);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Article 3', '2019-01-03', null, 3);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Article 4', '2019-01-04', '2019-01-04', 4);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Article 5', '2019-01-05', null, 4);
INSERT INTO article (title, publishedDate, createdAt, userId) VALUES ('Article 6', '2019-01-06', '2024-01-06', 4);

-- BLOCKS
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Article 1', 0, 1);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.', 1, 1);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_1', 2, 1);
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Article 2', 0, 2);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.', 2, 2);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_2', 1, 2);
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Article 3', 2, 3);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.', 1, 3);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_3', 0, 3);
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Article 4', 1, 4);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.', 0, 4);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'wallpaper_4', 1, 4);
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Article 5', 0, 5);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.', 1, 5);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_5', 2, 5);
INSERT INTO block (type, value, 'order', articleId) VALUES ('header', 'Article 6', 0, 6);
INSERT INTO block (type, value, 'order', articleId) VALUES ('paragraph', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.', 1, 6);
INSERT INTO block (type, value, 'order', articleId) VALUES ('image', 'wallpaper_6', 2, 6);
