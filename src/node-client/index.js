const os = require('os');
const io = require('socket.io-client');
let socket = io('http://127.0.0.1:8181');

socket.on('connect', () => {
    const nI = os.networkInterfaces();
    let macA;
    for (let key in nI) {
        if (!nI[key][0].internal) {
            macA = nI[key][0].mac;
            break;
        }
    }
    socket.emit('clientAuth', '123456789qwerty');
    
    let perfDataInterval = setInterval(() => {
        performanceData()
            .then((performanceData) => {
                socket.emit('perfData', performanceData)
            })
    }, 1000);    
})

const performanceData = function () {
    return new Promise(async (resolve, reject) => {
        const cpus = os.cpus();
        const osType = os.type() == 'Darwin' ? 'Mac' : os.type();
        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const usedMem = totalMem - freeMem;
        const memUsage = Math.floor(usedMem / totalMem * 100) / 100;
        const upTime = os.uptime();
        const numCores = cpus.length;
        const cpuModel = cpus[0].model;
        const cpuSpeed = cpus[0].speed;
        const cpuLoad = await getCpuLoad();
        resolve({
            freeMem,
            osType,
            totalMem,
            usedMem,
            memUsage,
            upTime,
            numCores,
            cpuModel,
            cpuSpeed,
            cpuLoad
        })
    })
}


const cpuAverage = function () {
    const cpus = os.cpus();
    let idleMs = 0;
    let totalMs = 0;
    cpus.forEach((core) => {
        for (type in core.times) {
            totalMs += core.times[type];
        }
        idleMs += core.times.idle
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}

const getCpuLoad = function () {
    return new Promise((resolve, reject) => {
        const start = cpuAverage();
        setTimeout(() => {
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;
            const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
            resolve(percentageCpu);
        }, 100)
    })
}

performanceData().then(d => console.log(d))