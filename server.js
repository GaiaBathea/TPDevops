const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration PostgreSQL
const pool = new Pool({
    user: 'ton_utilisateur',
    host: 'localhost',
    database: 'weatherapp',
    password: 'ton_mot_de_passe',
    port: 5432,
});

// Route pour ajouter une ville
app.post('/add', async (req, res) => {
    const { city } = req.body;
    try {
        await pool.query(
            'INSERT INTO favorites (city) VALUES ($1) ON CONFLICT DO NOTHING',
            [city]
        );
        res.json({ message: 'Ville ajoutée en favoris' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route pour lister les villes favorites
app.get('/favorites', async (req, res) => {
    try {
        const result = await pool.query('SELECT city FROM favorites');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});