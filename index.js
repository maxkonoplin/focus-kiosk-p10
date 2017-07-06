const App = require('./core/app');
const autoUpdater = require('electron-updater').autoUpdater;

var app = new App();
app.on('ready', function(){
    autoUpdater.checkForUpdates();
});

app.openWindow('file://' + __dirname + '/public/index.html', function(err, window){
    if(err) throw err;
});

app.registerShortcut('Alt+F4', function(){
    app.quit();
});

autoUpdater.on('update-available', function(info){
    console.log('Update available.', info);
});

autoUpdater.on('update-not-available', function(info){
    console.log('Update not available.', info);
});