const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    deleteAll,
    addReaction
} = require('../../controllers/thought-controller')

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .delete(deleteAll);

// /api/thoughts/:thoughtId
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:userId
router
    .route('/:userId')
    .post(createThought);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:id/reactions')
    .post(addReaction)

module.exports = router