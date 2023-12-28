import express from 'express'
import sqlite3 from 'sqlite3'
import fs from 'fs'



const app = express();

// db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');

fs.readFile('example.db', (err, data)=>{
    if(err){
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');
    }
})

const db = new sqlite3.Database('example.db');

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
});


// read
app.get('/lista', (req, res) => {
    const lista = []
    // db.each('SELECT id, name, age FROM users', (err, row) => {
    db.each('SELECT id, name, age FROM users', (err, row) => {
        lista.push(row)
    }, ()=>{
        res.send(lista);
    })
})

// read id
app.get('/lista/:id', (req, res) => {
    const id = req.params.id
    const lista = []
    db.each('SELECT id, name, age FROM users WHERE id = '+id, (err, row) => {
        lista.push(row)
    }, ()=>{
        res.send(lista[0]);
    })
})

//insert
app.post('/add', (req, res)=>{
    const {name, age} = req.body
    console.log(req.body)
    const insertStmt = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');
    insertStmt.run(name, age);
    insertStmt.finalize();
    res.json({msg: 'ok'});
})

// delete
app.get('/delete/:id', (req, res)=>{
    const id = req.params.id
    db.run(`DELETE FROM users WHERE id = ${id}`, ()=>{
        console.log(`${id} deleted`);
    })
    res.json({msg: 'Apagou'});
})

app.listen(3000)


