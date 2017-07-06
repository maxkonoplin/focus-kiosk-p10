const events = require('events');
const Progress = require('./progress');

function Page(){
    if(!(this instanceof Page)) return new Page();

    this.loader = null;
    this.container = null;
    this.progress = null;

    $(document).ready(function(){
        this.
        this.emit('init');
    }.bind(this));

    return this;
}

Page.prototype = Object.create(events.EventEmitter.prototype);
Page.prototype.constructor = Page;

Page.prototype.render = function(template){
    this.container.html(template.toString());
    setTimeout(function(){
        this.emit('render');
        this.container.mCustomScrollbar();
    }.bind(this), 500);
    return this;
};

Page.prototype.loading = function(){
    this.loader.show();
    this.container.hide();
    this.progress.start();
    return this;
};

Page.prototype.loaded = function(){
    this.loader.hide();
    this.container.show();
    this.progress.stop();
    return this;
};

module.exports = Page;