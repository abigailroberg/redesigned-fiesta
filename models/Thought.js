const { Schema, model, Types } = require('mongoose')
const moment = require('moment')

const reactionSchema = new Schema({
    // set custom id
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: 'Please enter something for your reaction!',
        maxlength: 280
    },
    username: {
        type: String,
        required: 'Please enter your username'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMM Do, YYYY; h:mm:ss a")
    }
})

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'What are you thinking??',
        maxlength: 280,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format("MMM Do, YYYY; h:mm:ss a")
    },
    username: {
        type: String,
        required: 'We need your username!'
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
})

// reaction count virtual
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought