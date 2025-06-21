const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('./database/cerdas_cermat.db');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: 'Username atau password salah' });
        }
        req.session.user = { id: user.id, username: user.username, role: user.role };
        res.json({ role: user.role });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout berhasil' });
});

module.exports = router;
