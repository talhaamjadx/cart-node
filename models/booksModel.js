const db = require("../utils/database");

class Book{
    constructor(name, author, price, description) {
        this.name = name
        this.author = author
        this.price = price
        this.description = description
    }
    addBook(){
        return db.execute(`INSERT INTO books (name,author,price,description) VALUES ('${this.name}','${this.author}','${this.price}','${this.description}')`)
    }
    static bookById(id){
        return db.execute(`SELECT * FROM books WHERE id=${id}`)
    }
    static getAll(){
        return db.execute('SELECT * FROM books')
    }
}

module.exports = Book