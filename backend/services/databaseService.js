const mongoose = require('mongoose')
const jwt =require('jsonwebtoken')

let URL = 'mongodb://localhost:27017/testdb'
const start = ()=>{
    mongoose.connect(URL)
    mongoose.connection.on(
        "error",()=>{
            console.log("Error Connecting DB")
        }
    )
    mongoose.connection.once(
        "Connection_OK",()=>{
            console.log('DB Connnected')
        }
    )
}




module.exports = {start}


