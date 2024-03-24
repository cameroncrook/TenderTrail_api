const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db_connection = require('./db/connection');
require('dotenv').config();
const utilities = require('./utility/');
const app = express();

const accountRoutes = require('./routes/accountRoutes');
const deckRoutes = require('./routes/deckRoutes');
const gameRoutes = require('./routes/gameRoutes');

// CORS
app.use(cors());

// session storage
app.use(session({
    store: new pgSession({
        pool: db_connection,
        createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'session',
}));

// Routes
app.get('/', (req, res) => {
    res.send("This is a test");
});

// middleware
app.use('/account', accountRoutes);
app.use('/deck', utilities.checkLogin, deckRoutes);
app.use('/game', utilities.checkLogin, gameRoutes);

// start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});