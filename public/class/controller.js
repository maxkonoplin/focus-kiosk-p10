class Controller {

    constructor(app){
        this._app = app;
    }

    setProgress(progress){
        this._app.page.loading(progress);
    }

    end(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this._app.page.loaded();
                    return resolve();
                }
                catch(err){
                    return reject(err);
                }
            }, 500);
        });
    }

    get(route){
        return this._app.api.request({
            method: 'GET',
            route: route
        });
    }

    render(template, data){
        return this._app.page.render(template, data);
    }

}

module.exports = Controller;