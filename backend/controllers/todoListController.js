const todoListSchema = require('../models/todoSchema')
const mongoose = require('mongoose')

// Get all lists 
const getLists = async (req, res) => {
    const lists = await todoListSchema.find({}).sort({createdAt: -1})

    res.status(200).json(lists)
}


// Get a single list 
const getSingleList = async (req, res) => {
    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"No such list! Cannot FIND"})
    }

    const list = await todoListSchema.findById(id)

    if(!list) {
        return res.status(404).json({error:"No such list! Cannot FIND"})
    }

    res.status(200).json(list)
}

// Post a list 
const createList = async (req, res) => {
    const {title, description} = req.body 

    try {
        const todoList = await todoListSchema.create({title, description})
        res.status(200).json(todoList)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//  Delete a list 
const deleteList = async(req, res) => {
    const {id} = req.params
    
    // Checking if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"No such list! Cannot DELETE!"})
    }

    const list = await todoListSchema.findOneAndDelete({_id: id})

    if(!list) {
        return res.status(404).json({error: "Cannot find a list! Cannot DELETE!"})
    }

    res.status(200).json(list)
}

// Update a list
const updateList = async(req, res) => {
    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such list! Cannot UPDATE!"})
    }

    const list = await todoListSchema.findByIdAndUpdate({_id: id}, {...req.body})
    
    if (!list) {
        return res.status(400).json({error:"No such list! Cannot UPDATE!"})
    }

    res.status(200).json(list)
}

module.exports = {getLists, getSingleList, createList, deleteList, updateList}