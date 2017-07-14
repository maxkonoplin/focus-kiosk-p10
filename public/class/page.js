const events = require('events');
const View = require('./view');

class Page extends events.EventEmitter {

    constructor(app){
        super();
        this._app = app;
        this._loader = $('.loader-wrapper');
        this._container = $('.main-content');
        this._progress = $('#logo-loader');
        this._progress.loadgo({
            opacity: 1,
            image: 'assets/images/logo-loader-plain.png',
            bgcolor: 'none',
            loop: 10
        });
        this._timeout = setTimeout(() => this.emit('sleep'), 120000);
        $(document).on('click.activity mousemove.activity scroll.activity', () => {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(() => this.emit('sleep'), 120000);
        });
    }

    loading(progress){
        this._loader.show();
        this._container.hide();
        this._progress.loadgo('setprogress', progress);
        return this;
    }

    loaded(){
        this._loader.hide();
        this._container.show();
        return this;
    }

    render(name, data){
        return new Promise((resolve, reject) => {
            try {
                let view = new View(name, data);
                this._container.mCustomScrollbar('destroy');
                this._container.html(view.toString());
                setTimeout(() => {
                    try {
                        this._container.mCustomScrollbar({
                            theme: 'minimal-dark'
                        });
                        return resolve();
                    }
                    catch(err){
                        return reject(err);
                    }
                }, 100);
            }
            catch(err){
                return reject(err);
            }
        });
    }

}

module.exports = Page;