const Machine = require('../models/machine')


module.exports = {
    checkAndAdd : function (data) {
        return new Promise((resolve, reject) => {
            Machine.findOne({
                macA : data.macA
            }, (err, doc) => {
                if(err){
                    throw err;
                    reject(err)
                } else if (doc === null) {
                    let newMachine = new Machine(data);
                    newMachine.save();
                    resolve('added');
                } else {
                    resolve('found');
                }
            })
        })
    }
}