const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

function Template(name){
    if(!(this instanceof Template)) return new Template(name);
    this.template = fs.readFileSync(path.join(__dirname, '../templates/', name + '.html')).toString();
    this.content = this.template;
    return this;
}

Template.prototype = Object.create(null);
Template.prototype.constructor = Template;

Template.prototype.compile = function(data){
    this.content = mustache.render(this.template, data);
    return this;
};

Template.prototype.render = function(data){
    return mustache.render(this.template, data);
};

Template.prototype.toString = function(){
    return this.content;
};

module.exports = Template;