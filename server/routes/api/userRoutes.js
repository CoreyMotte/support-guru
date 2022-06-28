const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route("/")
    .post(userController.createUser);

module.exports = router;