const { User } = require('../models')

const UserController = {
    createUser (req, res) {
        const { email, password } = req.body
        try {
            const user = User.create({ email, password });
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}

module.exports = UserController;