const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');

const PORT = 4242;
const HOST = 'localhost';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
mongoose.connect('mongodb://localhost:27042/mern-pool');

const usershema = new mongoose.Schema({
    login: { type: String, required: true, unique: true, minlength: 5, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: Boolean, default: false }
})
const productshema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    
})
const Product = mongoose.model('Product', productshema);

const User = mongoose.model('User', usershema);

app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', async (req, res) => {
    const { login, email, password, passwordConfirm } = req.body;

    if (!login || !email || !password || !passwordConfirm) {
        return res.status(400).send('Tout les champs sont requis');

    }

    if (password !== passwordConfirm) {
        return res.status(400).send('le mot de passe ne correspond pas');
    }

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    const user = new User({
        login,
        email,
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(200).send(`Bienvenue ${login}!`);
    } catch (error) {
        res.status(400).send('Erreur lors de la creation de lutilisateur ' + error.message);
    }
});

app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('shop',{products});
});

app.get('/shop/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).send('Error 404: article non trouvé');
    }
    res.render('product', { product });
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/add', async (req, res) => {
    const { title, price, desc } = req.body;
    const product = new Product({
        title,
        price,
        desc
    });
    try {
        await product.save()

    } catch (error) {
        res.status(400).send('erreur au moment de lajout'+ error.message)
    }
})
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email et mot de passe sont requis');
    }

    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    try {
        const user = await User.findOne({ email, password: hashedPassword });

        if (!user) {
            return res.status(400).send('email ou mot de passe invalide');
        }

        res.status(200).send(`bienvenue ${user.login}!`);
    } catch (error) {
        res.status(400).send('Erreur lors de la connection: ' + error.message);
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT} in development mode`);
});
