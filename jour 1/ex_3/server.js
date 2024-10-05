const express = require('express');
const path = require('path');
const app = express();

const PORT = 4242;
const HOST = 'localhost';

app.get('/', (req, res) => {
     const filePath = path.join(__dirname + '/view/', 'index.html');
    res.sendFile(filePath);
});
app.get('/name/<name>', (req, res) => {
    const filePath = path.join(__dirname + '/view/', 'name.html');
    res.sendFile(filePath);
});
app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT} in development mode`);
});
