const getDb = require("../utils/database").getDb
const { ObjectId } = require("mongodb")

class Book{
    constructor(name, author, price, description, id, userId){
        this.name = name
        this.author = author
        this.price = price
        this.description = description
        this._id = id ? new ObjectId(id) : null
        this.userId = userId
    }
    save(){
        const db = getDb()
        if(this._id)
            return db.collection("books").updateOne({_id: this._id}, {$set: this})
        else
            return db.collection("books").insertOne(this)
    }

    static fetchOne(id){
        const db = getDb()
        return db.collection("books").find({_id: new ObjectId(id)}).next()
    }
    static fetchAll(){
        const db = getDb()
        return db.collection("books").find().toArray()
    }
    static deleteBook(id){
        const db = getDb();
        return db.collection("books").deleteOne({_id: new ObjectId(id)})
    }
}

module.exports = Book