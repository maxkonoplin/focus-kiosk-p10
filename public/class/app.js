const API = require('./api');
const Guard = require('./guard');
const Network = require('./network');
const Page = require('./page');
const Router = require('./router');

class App {

    constructor(){
        this.api = new API(this);
        this.guard = new Guard(this);
        this.network = new Network(this);
        this.page = new Page(this);
        this.router = new Router(this);
    }

}

module.exports = App;