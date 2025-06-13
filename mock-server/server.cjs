const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/yacht-data', (req, res) => {
    const now = new Date();

    const data = {
        velocita: (10 + Math.random() * 10).toFixed(1),
        direzione_bussola: (Math.random() * 360).toFixed(1),
        stato: Math.random() > 0.5 ? "In navigazione" : "Ormeggiato",
        tensione: (11.5 + Math.random()).toFixed(2),
        accensione: Math.random() > 0.3,
        posizione: {
            lat: 42.123 + Math.random() * 0.01,
            lon: 11.234 + Math.random() * 0.01
        },
        ultimo_aggiornamento: now.toISOString()
    };

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`✅ Mock yacht server in ascolto su http://localhost:${PORT}/yacht-data`);
});
