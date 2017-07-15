const API = require('./api');
const Guard = require('./guard');
const Localization = require('./localization');
const Network = require('./network');
const Page = require('./page');
const Router = require('./router');

class App {

    constructor(){
        this.api = new API(this);
        this.guard = new Guard(this);
        this.localization = new Localization(this);
        this.network = new Network(this);
        this.page = new Page(this);
        this.router = new Router(this);
    }

}

module.exports = App;