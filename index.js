const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING)
        console.log(`✅ MongoDB connected at ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
    }
}
connectDB()

app.use(express.static("public"))

// app.use() mainRoutes
// app.use() api Routes

app.listen(process.env.PORT, () => {
    console.log(`✅ Express connected on port ${process.env.PORT}`)
})