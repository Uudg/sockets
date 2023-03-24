const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Message = require('./messages');
const connectDB = require('./db');
const {
    getAll,
    getOnlineUsers,
    setOnline
} = require('./get');
const User = require('./users');
cors = require('cors')
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});
app.use(cors({
    origin: '*'
}))
connectDB();

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

app.get('/reports', (req, res) => {
    getAll().then(response => res.send(response))
})


async function getOnline() {
    return await getOnlineUsers()
}

async function setUserOnline(userName, id) {
    return await setOnline(userName, id)
}

async function createUser(userName, id) {
    const user = new User({
        userName,
        id
    })
    await user.save()
}

io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('login', async (userName, id) => {
        const res = await setUserOnline(userName, id)
        socket.to(id).emit('return-login', res)
    })

    socket.on('create-user', async (userName, id) => {
        const res = new User({
            userName,
            id
        })
        await res.save()
        socket.emit('create-user-return', res)
    })

    socket.on('message', async (data) => {
        console.log('New message:', data);
        const message = new Message(data);
        await message.save();
        socket.broadcast.emit('new-message', data);
    });

    socket.on('report', async (data) => {
        console.log('New message:', data);
        const report = new Report(data);
        await report.save();
        socket.broadcast.emit('new-report', data);
    });
});