const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');


const PORT = 42420;
const HOST = 'localhost';

//MONGO connection

const mongodbURL = 'mongodb://localhost:27042/';
const client = new MongoClient(mongodbURL);

async function connect() {
    try {
        const conn = await client.connect();
        const db = conn.db('mern-pool');
        const coll = await db.collection('students');
        const result = await coll.find().toArray();
        return result;
    } catch (err) { console.log(err) }
    return;
}

app.get('/', async (req, res) => {
    
      const result =  await connect();
        res.send(result);
   

});

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT} in development mode`);
});
