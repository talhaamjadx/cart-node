const getDb = require("mongodb").getDb

class Order{
    constructor(userId, books){
        this.userId = userId
        this.books = books
    }
    create(){
        const db = getDb();
        return db.collection("orders").insertOne(this)
    }
}

module.exports = Order