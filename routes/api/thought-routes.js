const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    deleteAll
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

module.exports = router