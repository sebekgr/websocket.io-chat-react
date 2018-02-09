const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UsersServices = require('./UsersServices');


const userService = new UsersServices();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    
    //update list of users and emit full list for others
    socket.on('join', (name) => {
        userService.addUser({
            id: socket.id,
            name
        })
    });
    io.emit('update', {
        users: userService.getAllUsers()
    });


    //sending msg from user
    socket.on('message', (message) => {
        const {name} = userService.getUserById(socket.id);
        socket.broadcast.emit('message', {
            text: message.text,
            from: name
        })
    });


    //if user disconnect
    socket.on('disconnect', () => {
        userService.removeUser(socket.id);
        socket.broadcast.emit('update', {
            users: userService.getAllUsers()
        })
    });


})

server.listen(9000, () => { console.log("server run at 9000")});