CREATE TABLE submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    age INTEGER,
    date TEXT,
    subscribe INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);