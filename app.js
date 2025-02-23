const express = require('express')
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const app = express();

app.use(express.json());

// db connection
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

        db = getDb();
    } else {
        console.log(err);
    }
})


// routes
app.get("/books", (req, res) => {
    let books = [];
    db.collection("books").find({}).toArray().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    })
})


app.get("/books/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Invalid book id"
        });
        return;
    }

    db.collection("books").findOne({ _id: new ObjectId(id) }).then((book) => {
        res.status(200).json(book);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
})


app.post("/books", (req, res) => {
    const book = req.body;
    db.collection("books").insertOne(book).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    })
})

app.delete("/books/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Invalid book id"
        });
        return;
    }

    db.collection("books").deleteOne({ _id: new ObjectId(id) }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
})

app.patch("/books/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).json({
            error: "Invalid book id"
        });
        return;
    }

    const updatedBook = req.body;

    db.collection("books").updateOne({ _id: new ObjectId(id) }, { $set: updatedBook }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    })

})