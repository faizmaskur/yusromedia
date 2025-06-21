const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('./database/cerdas_cermat.db');

router.use((req, res, next) => {
    if (req.session.user?.role !== 'display') return res.status(403).json({ error: 'Akses ditolak' });
    next();
});

router.get('/question', (req, res) => {
    db.get('SELECT * FROM questions WHERE id = (SELECT MAX(id) FROM questions)', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

router.post('/submit', (req, res) => {
    const { questionId, answer } = req.body;
    db.get('SELECT correct_answer FROM questions WHERE id = ?', [questionId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ correct: answer === row.correct_answer });
    });
});

module.exports = router;
