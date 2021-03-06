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
    // update a thought
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' })
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },
    deleteThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with that id' })
                return
            }
            res.json({ message: 'Deleted!' })
        })
        .catch(err => res.json(err))
    },
    // delete all thoughts
    deleteAll(req, res) {
        Thought.deleteMany({})
        .then(res.json({ message: 'thoughts cleared' }))
    },
    // add a reaction to a thought
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id},
            { $push: { reactions: body } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with that id' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },
    // delete a reaction by id
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with that id' })
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController