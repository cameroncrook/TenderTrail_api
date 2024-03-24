const db_connection = require('../db/');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
    const { username, password } = req.query;
    
    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const result = await db_connection.addUser(username, hashedPassword);

    if (result) {
        res.status(200).send("user successfully created");
    } else {
        res.status(500).send("Sorry something went wrong");
    }
    
}

async function login(req, res) {
    // change to post 'req.body'
    const { username, password } = req.query;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    const user = await db_connection.getUser(username);
    if (!user) {
        res.status(500).send("Sorry something went wrong");
    }
    
    const result = await bcrypt.compare(password, user.password);

    if (result) {
        req.session.user_id = user.game_user_id;
        res.status(200).send("User logged in");
    } else {
        res.status(200).send("Wrong login credentials");
    }
}

async function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.sendStatus(500);
        } else {
            // Session is successfully destroyed
            res.send('Logged out successfully');
        }
    });
}

function checkLogin(req, res) {
    const user = req.session.user_id;
    if (user) {
        res.json({ user_id: user });
    } else {
        res.json({ user_id: null });
    }
}

module.exports = { createUser, login, logout, checkLogin };
