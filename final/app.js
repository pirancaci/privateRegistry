require('dotenv').config()
const express = require('express')
const app = express()


const routes = require('./routes/routes')
const connectDB = require('./db/connect')

// middleware
app.use(express.json())


//routes
app.use('/api/v1/modules', routes)

const port = 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listenning on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()


