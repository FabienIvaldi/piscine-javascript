const express = require('express');
const path = require('path');
const app = express();

const PORT = 4242;
const HOST = 'localhost';


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static('public'));

app.get('/', (req, res) => {
     const filePath = path.join(__dirname + '/view/', 'index.html');
    res.sendFile(filePath);
});
app.get('/name/:name', (req, res) => {
    const name = req.params.name;
    res.render(`name`, {name});


});
app.get('/name/', (req, res) => {
    const name = req.params.name;
    res.send(`Hello, unknown`);
});
app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT} in development mode`);
});
