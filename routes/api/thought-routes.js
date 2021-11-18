const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    createThought,
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
    
// /api/thoughts/:userId
router
    .route('/:userId')
    .post(createThought);

module.exports = router