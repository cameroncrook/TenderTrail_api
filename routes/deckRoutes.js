const express = require("express");
const router = new express.Router();

router.get('/', (req, res) => {
    res.send("Deck Route");
});

router.get('/test', (req, res) => {
    const user = req.session.user_id;
    if (user) {
        res.send(`User ${user} is logged in and ready to go`);
    } else {
        res.send('No user found');
    }
})

module.exports = router;