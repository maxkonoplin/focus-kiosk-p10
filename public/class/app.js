const dns = require('dns');
const events = require('events');
const crypto = require('crypto');
const Guard = require('./guard');
const Progress = require('./components/progress');

function App(){
    if(!(this instanceof App)) return new App();

    var self = this;
    this.loader = $('.loader-wrapper');
    this.container = $('.main-content');
    this.progress = new Progress('#logo-loader', {
        opacity: 1,
        image: 'assets/images/logo-loader-plain.png',
        bgcolor: 'none',
        loop: 10
    });
    this.guard = new Guard('admin-password');

    /** ---[ Link navigation ]--- **/
    $(document).on('click', 'a[href]', function(e){
        e.preventDefault();
        self.emit('navigate:' + $(this).attr('href'));
    });

    /** ---[ Keyboard virtualization ]--- **/
    $(document).on('focus', 'input[type="text"]', function(e){
        e.preventDefault();

    });

    this.loading();

    return this;
}

App.prototype = Object.create(events.EventEmitter.prototype);
App.prototype.constructor = App;

App.prototype.loading = function(){
    this.loader.show();
    this.container.hide();
    return this;
};

App.prototype.loaded = function(){
    this.loader.hide();
    this.container.show();
    return this;
};

App.prototype.render = function(template){
    this.loading();
    this.container.mCustomScrollbar('destroy');
    this.container.html(template.toString());
    setTimeout(function(){
        this.container.mCustomScrollbar({
            theme: 'minimal-dark'
        });
        this.emit('render');
        this.loaded();
    }.bind(this), 100);
    return this;
};

module.exports = App;

/** ---[ Other methods ]--- **/
App.prototype.isOnline = function(callback){
    dns.resolve('www.google.com', function(err){
        if(typeof callback == 'function'){
            if(err) return callback(false);
            return callback(true);
        }
    });
};