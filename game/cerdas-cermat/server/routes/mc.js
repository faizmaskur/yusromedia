const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('./database/cerdas_cermat.db');

router.use((req, res, next) => {
    if (req.session.user?.role !== (router.path === '/jury' ? 'jury' : 'mc')) return res.status(403).json({ error: 'Akses ditolak' });
    next();
});

router.get('/question', (req, res) => {
    db.get('SELECT * FROM questions WHERE id = (SELECT MAX(id) FROM questions)', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

router.get('/groups', (req, res) => {
    db.all('SELECT p.group_name, SUM(s.score) as score FROM participants p LEFT JOIN scores s ON p.id = s.participant_id GROUP BY p.id', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
