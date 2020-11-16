var Service = require('node-windows').Service;

// Create a new service object
console.log('Creating service object')
var svc = new Service({
    name:'Steelseries Api Finder',
    description: 'Helps chrome browser find running steelseries engine instance.',
    script: __dirname + '\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
});

svc.on('error', function (e){
    console.log(e);
})

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
    console.log(svc.name+' started!\nVisit http://127.0.0.1:55555 to see it in action.');
});

// Install the script as a service.
console.log('installing');
svc.install();
