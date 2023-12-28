const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required : true
    },
    title: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var TaskModel = mongoose.model('tasks',taskSchema)
module.exports = TaskModel