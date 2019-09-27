const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')
const app = express()

const server = require('http').Server(app)
const socket = require('socket.io')(server)
const port = 3333
const BD_URL = 'mongodb+srv://tinderR:tinderR@cluster0-4iixs.mongodb.net/tinderR?retryWrites=true&w=majority'

const connectedUsers = {}

socket.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUsers[user] = socket.id 

})

mongoose.connect(BD_URL, {
    useNewUrlParser: true
})

app.use((request, response, next) => {
    request.socket = socket
    request.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(port)

console.log(`Listen do port: ${port}`)