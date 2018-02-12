const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UsersServices = require('./UsersServices');


const userService = new UsersServices();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    //source path 'index' for your client app/view
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', socket => {
    
    //update list of users and emit full list for others
    socket.on('join', name => {
        userService.addUser({
            id: socket.id,
            name
        })
    });
    io.emit('update', {
        users: userService.getAllUsers()
    });


    //sending msg from user
    socket.on('message', message => {
        const {name} = userService.getUserById(socket.id);
        socket.broadcast.emit('message', {
            text: message.text,
            from: name,
            time: message.time
        })
    });

    //deleting msg
    socket.on('deleteMsg', msg => {
		io.emit('deleteMsg', msg);

	});


    //if user disconnect
    socket.on('disconnect', () => {
        userService.removeUser(socket.id);
        socket.broadcast.emit('update', {
            users: userService.getAllUsers()
        })
    });


})

const port = process.env.PORT || 9000;

server.listen(port, () => { console.log(port)});