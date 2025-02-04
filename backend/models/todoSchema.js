const mongoose = require('mongoose')

const Schema = mongoose.Schema; 

const todoSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, default: "", required: false},  
    completed: {type: Boolean, default: false}, 
}, {timestamps: true})

module.exports = mongoose.model("todoList", todoSchema)