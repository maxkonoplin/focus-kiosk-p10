const App = require('./core/app');

var app = new App();
app.openWindow('file://' + __dirname + '/public/index.html', function(err, window){
    if(err) throw err;

    window.on('show', function(){
        window.focus();
    });
});

app.registerShortcut('Alt+F4', function(){
    app.quit();
});

app.on('update-downloaded', function(){
    app.quitAndInstall();
});