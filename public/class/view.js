const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

class View {

    constructor(name, data){
        this.data = Object.assign({}, data);
        this.template = fs.readFileSync(path.join(__dirname, '../views', path.join('/', name + '.html'))).toString();
        this.content = mustache.render(this.template, this.data);
    }

    toString(){
        return this.content;
    }

}

module.exports = View;