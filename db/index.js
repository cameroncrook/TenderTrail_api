const db = require('./connection');

async function addUser(username, password) {
    try {
        const sql = `INSERT INTO public.game_user (username, password) VALUES ($1, $2) RETURNING *`;
        return await db.query(sql, [username, password]);
    } catch (err) {
        console.log(`Error while creating user: ${err.message}`)
        return false;
    }
}

async function getUser(username) {
    try {
        const sql = `SELECT * FROM public.game_user WHERE game_user_id = (SELECT game_user_id FROM public.game_user WHERE username = $1)`;
        const response = await db.query(sql, [username]);
        return response.rows[0];
    } catch (err) {
        console.log(`Error while authenticating user: ${err.message}`)
        return false;
    }
}

module.exports = { addUser, getUser };
