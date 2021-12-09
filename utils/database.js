const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient;

let _db;

const mongoClient = callback => {
    MongoClient.connect('mongodb+srv://talha_789:iamnumber4@cluster0.jbkor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(client => {
            _db = client.db()
            callback()
            console.log("connected")
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

const getDb = () => {
    if (_db)
        return _db;
    else
        return "No Database Found!"
}

exports.mongoClient = mongoClient
exports.getDb = getDb