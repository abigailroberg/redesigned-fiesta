const Thought = require('../models/Thought')
const User = require('../models/User')

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },
    // get single thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },
    // create thought (expects "thoughtText": "thoughtText", "username": "username")
    createThought({params, body}, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: dbThoughtData._id }},
                    { new: true }
                )
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(400).json({message: "No user found with this id!"})
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },
    // delete all thoughts
    deleteAll(req, res) {
        Thought.deleteMany({})
        .then(res.json({ message: 'database cleared' }))
    }   
}

module.exports = thoughtController