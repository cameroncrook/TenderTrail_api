// controllers
const accountController = require("../controllers/accountControllers");

const express = require("express");
const router = new express.Router();

router.get('/', (req, res) => {
    res.send("Accounts Route");
});

router.get('/create-user', accountController.createUser);
router.get('/login', accountController.login);
router.get('/logout', accountController.logout);
router.get('/check-login', accountController.checkLogin);

module.exports = router;