const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('./database/cerdas_cermat.db');

router.use((req, res, next) => {
    if (req.session.user?.role !== 'admin') return res.status(403).json({ error: 'Akses ditolak' });
    next();
});

router.post('/participants', (req, res) => {
    const { name, group_name, group_origin } = req.body;
    db.run('INSERT INTO participants (name, group_name, group_origin) VALUES (?, ?, ?)', [name, group_name, group_origin], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

router.post('/questions', (req, res) => {
    const { session, question_text, answer_type, correct_answer, options, hint } = req.body;
    db.run('INSERT INTO questions (session, question_text, answer_type, correct_answer, options, hint) VALUES (?, ?, ?, ?, ?, ?)', 
        [session, question_text, answer_type, correct_answer, JSON.stringify(options), hint], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

router.post('/scores', (req, res) => {
    const { participant_id, session, score } = req.body;
    db.run('INSERT INTO scores (participant_id, session, score) VALUES (?, ?, ?)', [participant_id, session, score], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

router.get('/questions', (req, res) => {
    db.all('SELECT * FROM questions', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
