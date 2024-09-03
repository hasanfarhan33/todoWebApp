const {getLists, getSingleList, createList, deleteList, updateList} = require("../controllers/todoListController")
const express = require('express')
const router = express.Router()  




// GET all lists 
router.get("/", getLists)

// GET id
router.get("/:id", getSingleList)

// POST 
router.post("/", createList)

// Delete 
router.delete("/:id", deleteList)

// Update a list 
router.patch("/:id", updateList)

module.exports = router 