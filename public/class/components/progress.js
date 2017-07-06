function Progress(selector, options){
    if(!(this instanceof Progress)) return new Progress(selector, options);

    this.element = $(selector);
    this.element.loadgo(options);
    this.element.loadgo('setprogress', 0);

    return this;
}

Progress.prototype = Object.create(null);
Progress.prototype.constructor = Progress;

Progress.prototype.set = function(value){
    this.element.loadgo('setprogress', value);
    return this;
};

module.exports = Progress;