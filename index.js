import sqlite3 from 'sqlite3'
// const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('example.db');

// Create a table
// db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');

// insert
// const insertStmt = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');
// insertStmt.run('John Doe', 25);
// insertStmt.run('Jane Doe', 30);
// insertStmt.finalize();

// db.each('SELECT id, name, age FROM users WHERE id < 9', (err, row) => {
//     console.log(`${row.id}: ${row.name}, ${row.age} years old`);
// });


// Close the database connection
db.close();


