const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const PORT = 4242;
const HOST = 'localhost';


app.get('/', (req, res) => {
    const filePath = path.join(__dirname + '/view/', 'index.html');
    res.sendFile(filePath);
});

app.post('/submit', (req, res) => {
    const NewStudent = new Students({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        phone: req.body.phone,
    });

    NewStudent.save((err) => {
        if (err) {
            res.send('Erreur lors de lenregistrement des données.');
        } else {
            res.send('Données enregistrées avec succès.');
        }
    });
});


app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT} in development mode`);
});
