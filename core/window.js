const events = require('events');
const BrowserWindow = require('electron').BrowserWindow;
const config = require('../config/window.json');

function Window(options){
    if(!(this instanceof Window)) return new Window(options);
    var self = this;
    events.EventEmitter.call(self);
    self._options = Object.assign({}, config, options, {show: false});
    self._window = new BrowserWindow(self._options);
    self._window.on('ready-to-show', function(){
        self._window.show();
    });
    self._window.on('blur', function(){
        self.emit('blur');
    });
    self._window.on('focus', function(){
        self.emit('focus');
    });
    self._window.on('show', function(){
        self.emit('show');
    });
    self._window.on('hide', function(){
        self.emit('hide');
    });
    self._window.on('maximize', function(){
        self.emit('maximize');
    });
    self._window.on('unmaximize', function(){
        self.emit('unmaximize');
    });
    self._window.on('minimize', function(){
        self.emit('minimize');
    });
    self._window.on('restore', function(){
        self.emit('restore');
    });
    self._window.on('resize', function(){
        self.emit('resize');
    });
    self._window.on('move', function(){
        self.emit('move');
    });
    self._window.on('closed', function(){
        self._window = null;
        self.emit('close');
    });
    return self;
}

Window.prototype = Object.create(events.EventEmitter.prototype);
Window.prototype.constructor = Window;
Window.prototype.open = function(url){
    if(this._window instanceof BrowserWindow){
        this._window.loadURL(url);
    }
    return this;
};

Window.prototype.blur = function(){
    if(this._window instanceof BrowserWindow){
        this._window.blur();
    }
    return this;
};

Window.prototype.focus = function(){
    if(this._window instanceof BrowserWindow){
        this._window.focus();
    }
    return this;
};

Window.prototype.show = function(){
    if(this._window instanceof BrowserWindow){
        this._window.show();
    }
    return this;
};

Window.prototype.hide = function(){
    if(this._window instanceof BrowserWindow){
        this._window.hide();
    }
    return this;
};

Window.prototype.maximize = function(){
    if(this._window instanceof BrowserWindow){
        this._window.maximize();
    }
    return this;
};

Window.prototype.unmaximize = function(){
    if(this._window instanceof BrowserWindow){
        this._window.unmaximize();
    }
    return this;
};

Window.prototype.minimize = function(){
    if(this._window instanceof BrowserWindow){
        this._window.minimize();
    }
    return this;
};

Window.prototype.restore = function(){
    if(this._window instanceof BrowserWindow){
        this._window.restore();
    }
    return this;
};

Window.prototype.close = function(){
    if(this._window instanceof BrowserWindow){
        this._window.close();
    }
    return this;
};

module.exports = Window;