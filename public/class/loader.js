const net = require('../../core/net');

function Loader(selector){
    if(!(this instanceof Loader)) return new Loader(selector);
    this.element = $(selector);
    return this;
}

Loader.prototype = Object.create(null);
Loader.prototype.constructor = Loader;

Loader.prototype.load = function(options, callback){

};

module.exports = Loader;