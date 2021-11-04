const Thought = require('../models/Thought')
const User = require('../models/User')

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },
}

module.exports = thoughtController