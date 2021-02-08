let socket = io()

$('#logibox').show()
$('#chatbox').hide()

$('#btnStart').click( ()=> {
    socket.emit('login' , {
        username : $('#userName').val(),
        password : $('#password').val()
    })
})

socket.on('logged_in', ()=>{
    $('#logibox').hide()
    $('#chatbox').show()

})

$('#btnSendMsg').click(()=>{
    socket.emit('msg_send' , {
        to: $('#inpToAll').val(),
        msg: $('#inpNewMsg').val()
    })
})

socket.on('msg_rcvd', (data) => {
    $('#ulMsgs').append($('<li>').text(
        `[${data.from}] : ${data.msg}`
    ))
})

socket.on('login_failed', () => {
    window.alert("Incorrect Username or Password")
})
