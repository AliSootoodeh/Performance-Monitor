function socketMain(io, socket) {

   // valid different clients (node or react)
    socket.on('clientAuth', (key) => {

        if(key === '123456789qwerty'){
            socket.join('clients');
        } else if (key === '987654321qwerty') {
            socket.join('ui');
        } else {
            // this is invalid request
            socket.disconnect(true);
        }
    })


    socket.on('perfData', (data) => {
        console.log(data)
    })
}

module.exports = socketMain;