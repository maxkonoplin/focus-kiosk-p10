const events = require('events');
const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const autoUpdater = require('electron-updater').autoUpdater;
const Window = require('./window');

function App(){
    if(!(this instanceof App)) return new App();
    var self = this;
    events.EventEmitter.call(self);
    self._app = app;
    self._updater = autoUpdater;
    self.stdin = process.stdin;
    self.stdout = process.stdout;
    self.stderr = process.stderr;

    /** ---[ App listeners ]--- **/
    self._app.once('ready', function(){
        self._updater.checkForUpdates();
        self.emit('ready');
    });
    self._app.on('window-all-closed', function(){
        if(process.platform != 'darwin'){
            self.quit();
        }
    });

    /** ---[ Process listeners ]--- **/
    process.on('uncaughtException', function(err){
        self.emit('error', err);
    });
    process.on('SIGINT', function(){
        self.quit();
    });

    /** ---[ Updater listeners ]--- **/
    self._updater.on('update-not-available', function(){
        setTimeout(function(){
            self._updater.checkForUpdates();
        }, 60000);
    });
    self._updater.on('update-available', function(){
        self.emit('update-available');
    });
    self._updater.on('download-progress', function(progress){
        self.emit('update-download-progress', progress);
    });
    self._updater.on('update-downloaded', function(){
        self.emit('update-downloaded');
    });
    self._updater.on('error', function(){
        setTimeout(function(){
            self._updater.checkForUpdates();
        }, 60000);
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

App.prototype.quitAndInstall = function(){
    this._updater.quitAndInstall();
    return this;
};

module.exports = App;