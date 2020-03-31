const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/performance', {useNewUrlParser : true, useMongoClient: true});
const { checkAndAdd } = require('../functions/checkAndAdd');

function socketMain(io, socket) {
    let macA;
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

    socket.on('initPrefData', async (data) => {
        macA = data.macA;
        const mongooseResponse = await checkAndAdd(data);
    })

    socket.on('perfData', (data) => {
        console.log(data);
        io.to('ui').emit('data', data)
    })
}

module.exports = socketMain;