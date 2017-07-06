const crypto = require('crypto');

function Guard(key){
    if(!(this instanceof Guard)) return new Guard(key);

    this.key = key;
    this.data = localStorage.getItem('guard:' + key);
    return this;
}

Guard.prototype = Object.create(null);
Guard.prototype.constructor = Guard;

Guard.prototype.set = function(value){
    this.data = crypto.createHash('sha256').update(value).digest('base64');
    localStorage.setItem(this.key, this.data);
};

Guard.prototype.check = function(value){
    return this.data == crypto.createHash('sha256').update(value).digest('base64');
};

module.exports = Guard;