const fs = require("fs")

const { globalPath } = require("../utils/index")

const path = require("path")

class Book{
    constructor(name) {
        this.name = name
    }
    addBook(){
        let books = Book.getAll()
        books = [...books, this]
        fs.writeFile(path.join(globalPath,'.data','books.json'), JSON.stringify(books), err => {
            if(!err)
                console.log("File written successfully")
            else
                console.log("Error in writing file")
        })
    }
    static getAll(){
        try{
            return JSON.parse(fs.readFileSync(path.join(globalPath,'.data','books.json')).toString())
        }
        catch{
            return []
        }
    }
}

module.exports = Book