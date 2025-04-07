const express = require('express');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE bugs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, status TEXT)");
  db.run("INSERT INTO bugs (title, status) VALUES ('Crash on login', 'open')");
});

app.get('/api/bugs', (req, res) => {
  db.all("SELECT * FROM bugs", [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
