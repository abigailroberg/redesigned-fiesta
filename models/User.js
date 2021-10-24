const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required!',
        trim: true
    },
    email: {
        type: String,
        required: 'Email address is required!',
        unique: true,
        // validate email address
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
})

// friend count virtual
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.friends.length + 1, 0)
})

const User = model('User', UserSchema)

module.exports = User