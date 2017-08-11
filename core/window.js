const events = require('events');
const BrowserWindow = require('electron').BrowserWindow;

class Window extends events.EventEmitter {

    constructor(options){
        super();

        this._options = Object.assign({}, {
            frame: false,
            fullscreen: true,
            resizable: false,
            aalwaysOnTop: true,
            webPreferences: {
                devTools: true,
                webSecurity: false,
                defaultEncoding: 'UTF-8'
            }
        }, options, {show: false});

        this._window = new BrowserWindow(this._options);
        this._window.on('ready-to-show', () => this._window.show());
        this._window.on('blur', () => this.emit('blur'));
        this._window.on('focus', () => this.emit('focus'));
        this._window.on('show', () => this.emit('show'));
        this._window.on('hide', () => this.emit('hide'));
        this._window.on('maximize', () => this.emit('maximize'));
        this._window.on('unmaximize', () => this.emit('unmaximize'));
        this._window.on('minimize', () => this.emit('minimize'));
        this._window.on('restore', () => this.emit('restore'));
        this._window.on('resize', () => this.emit('resize'));
        this._window.on('move', () => this.emit('move'));
        this._window.on('closed', () => {
            this._window = null;
            this.emit('close');
        });
    }

    open(url){
        if(this._window instanceof BrowserWindow){
            this._window.loadURL(url);
        }
        return this;
    }

    blur(){
        if(this._window instanceof BrowserWindow){
            this._window.blur();
        }
        return this;
    }

    focus(){
        if(this._window instanceof BrowserWindow){
            this._window.focus();
        }
        return this;
    }

    show(){
        if(this._window instanceof BrowserWindow){
            this._window.show();
        }
        return this;
    }

    hide(){
        if(this._window instanceof BrowserWindow){
            this._window.hide();
        }
        return this;
    }

    maximize(){
        if(this._window instanceof BrowserWindow){
            this._window.maximize();
        }
        return this;
    }

    unmaximize(){
        if(this._window instanceof BrowserWindow){
            this._window.unmaximize();
        }
        return this;
    }

    minimize(){
        if(this._window instanceof BrowserWindow){
            this._window.minimize();
        }
        return this;
    }

    restore(){
        if(this._window instanceof BrowserWindow){
            this._window.restore();
        }
        return this;
    }

    close(){
        if(this._window instanceof BrowserWindow){
            this._window.close();
        }
        return this;
    }

}

module.exports = Window;