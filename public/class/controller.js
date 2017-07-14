class Controller {

    constructor(app){
        this._app = app;
    }

    render(template, data){
        return this._app.page.render(template, data);
    }

}

module.exports = Controller;