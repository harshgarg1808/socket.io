const http = require('http')
const express = require('express')
const app = express()
const socketio = require('socket.io')
const server = http.createServer(app)

const io = socketio(server)

app.use('/', express.static(__dirname + '/public'))

let users = {
    'harsh': 'harsh'
}

let socketmap = {}


io.on('connection', (socket) => {
    console.log('A new memeber is added with id: ' + socket.id);

    function login ( s, u ){
        s.join(u)
        s.emit('logged_in')
        socketmap[s.id] = u

        console.log(socketmap);
    }

    socket.on('login', (data)=>{

        if(users[data.username]){
            if(users[data.username] == data.password){
                login(socket,data.username)
            }else{
                socket.emit('login_failed')
            }
        }
        else{
            users[data.username] = data.password
            login(socket,data.username)

        }
        console.log(users);        
    })
    
    socket.on('msg_send' , (data)=>{
        
        data.from = socketmap[socket.id]
        if(data.to){
            console.log(data.to);  
           io.to(data.to).emit('msg_rcvd', data)
        }else{
            console.log(data.to);
            socket.broadcast.emit('msg_rcvd', data)
        }
    })

})

server.listen('3344', () => {
    console.log("Sever listening on port 3344");
})