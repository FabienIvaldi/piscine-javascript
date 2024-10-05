const express = require('express');
const app = express();
var myMERN_module = require('./ myMERN_module.js');



const PORT = 4242;
const HOST = 'localhost';




app.get('/', (req, res) => {
    res.send('hello world')

});



app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT} in development mode`);
});
