require('dotenv').config() 

const express = require('express')
const mongoose = require('mongoose')

// Routes 
const todoRoutes = require('./routes/todoRoutes')

// Express app 
const app = express()

const port = process.env.PORT || 4000; 

app.use(express.json())

// Middleware 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes 
app.use("/api/todoLists", todoRoutes)

// Connecting to DB 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MONGO DB database")

        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    }).catch((err) => {
        console.log(err)
    })
