const db = require("mongoose")

db.connect("mongodb://localhost:27017/").then(() => {
    console.log("Database is connected")
}).catch(() => {
    console.log("Database connection failed")
})
