const { User } = require('../models')

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },
    // get single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    }
    // post new user
    // update user by id
    // delete user by id
}

module.exports = userController