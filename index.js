require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = express();

const port = process.env.PORT || 3000;

const router = require('./app/routers');

// On configure la session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});