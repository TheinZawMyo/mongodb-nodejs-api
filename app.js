const express = require('express')
const { connectToDb, getDb } = require('./db');

const app = express();

// db connection
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

        db = getDb();
    }    
})


// routes
app.get("/books", (req, res) => {

    db.collection("books").find()

    res.json({
        message: "List of books"
    })
})