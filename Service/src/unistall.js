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
svc.on('uninstall',function(){
    console.log('Service uninstalled');
});



// Install the script as a service.
console.log('uninstalling');
svc.uninstall();
