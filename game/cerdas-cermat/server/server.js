const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const juryRoutes = require('./routes/jury');
const mcRoutes = require('./routes/mc');
const displayRoutes = require('./routes/display');

const app = express();
const db = new sqlite3.Database('./database/cerdas_cermat.db');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
    secret: 'cerdas_cermat_secret',
    resave: false,
    saveUninitialized: false
}));

// Inisialisasi database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, role TEXT NOT NULL)`);
    db.run(`CREATE TABLE IF NOT EXISTS participants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, group_name TEXT NOT NULL, group_origin TEXT NOT NULL)`);
    db.run(`CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY AUTOINCREMENT, session INTEGER NOT NULL, question_text TEXT NOT NULL, answer_type TEXT NOT NULL, correct_answer TEXT NOT NULL, options TEXT, hint TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, participant_id INTEGER NOT NULL, session INTEGER NOT NULL, score INTEGER NOT NULL, FOREIGN KEY (participant_id) REFERENCES participants(id))`);
    
    // Insert pengguna default
    db.run(`INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin'), ('jury', 'jury123', 'jury'), ('mc', 'mc123', 'mc'), ('display', 'display123', 'display')`);
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/jury', juryRoutes);
app.use('/mc', mcRoutes);
app.use('/display', displayRoutes);

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
