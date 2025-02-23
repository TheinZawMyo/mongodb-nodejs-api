import { MongoClient } from "mongodb";

let dbConnection

export const connectToDb = (cb) => {
    MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            cb(err);
        });
}

export const getDb = () => dbConnection