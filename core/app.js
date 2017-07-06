const events = require('events');
const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const Window = require('./window');

function App(){
    if(!(this instanceof App)) return new App();
    var self = this;
    events.EventEmitter.call(self);
    self._app = app;
    self.stdin = process.stdin;
    self.stdout = process.stdout;
    self.stderr = process.stderr;
    self._app.once('ready', function(){
        self.emit('ready');
    });
    self._app.on('window-all-closed', function(){
        if(process.platform != 'darwin'){
            self.quit();
        }
    });
    process.on('uncaughtException', function(err){
        self.emit('error', err);
    });
    process.on('SIGINT', function(){
        self.quit();
    });
    return self;
}

App.prototype = Object.create(events.EventEmitter.prototype);
App.prototype.constructor = App;
App.prototype.openWindow = function(url, callback){
    var self = this;
    if(self._app.isReady()){
        setImmediate(function(){
            try {
                var window = new Window();
                window.open(url);
                if(typeof callback == 'function'){
                    callback(null, window);
                }
            }
            catch(err){
                if(typeof callback == 'function'){
                    callback(err, null);
                }
            }
        });
    }
    else {
        self.once('ready', function(){
            try {
                var window = new Window();
                window.open(url);
                if(typeof callback == 'function'){
                    callback(null, window);
                }
            }
            catch(err){
                if(typeof callback == 'function'){
                    callback(err, null);
                }
            }
        });
    }
    return self;
};

App.prototype.exit = function(statusCode){
    this._app.exit(statusCode);
    return this;
};

App.prototype.quit = function(){
    this.emit('quit');
    this.exit(0);
    return this;
};

App.prototype.registerShortcut = function(shortcut, callback){
    if(this._app.isReady()){
        globalShortcut.register(shortcut, callback);
    }
    else {
        this.once('ready', function(){
            globalShortcut.register(shortcut, callback);
        });
    }
    return this;
};

module.exports = App;