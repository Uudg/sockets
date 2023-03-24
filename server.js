const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Message = require('./messages');
const connectDB = require('./db');
const getAll = require('./get');
cors = require('cors')
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(cors())
connectDB();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

server.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.get('/asyl', async (req, res) => {
    res.send({
        msg: 'loh'
    })
})


app.get('/', (req, res) => {
    getAll().then(response => res.send(response))
})

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('message', async (data) => {
        console.log('New message:', data);
        const message = new Message(data);
        await message.save();
        io.emit('message', message);
    });
});